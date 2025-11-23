import { google } from '@ai-sdk/google';
import { mistral } from '@ai-sdk/mistral';
import { streamText, CoreMessage } from 'ai';
import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getCrazy } from './tools/getCrazy';
import { getInternship } from './tools/getInternship';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { getSports } from './tools/getSports';
import { getWeather } from './tools/getWeather';

export const maxDuration = 30;

// ❌ Pas besoin de l'export ici, Next.js n'aime pas ça
function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

// Helper function to check if error is quota exceeded
function isQuotaExceeded(error: unknown): boolean {
  if (!error) return false;
  
  const errorStr = typeof error === 'string' 
    ? error 
    : error instanceof Error 
      ? error.message 
      : JSON.stringify(error);
  
  const errorLower = errorStr.toLowerCase();
  return (errorLower.includes('quota') && 
         (errorLower.includes('exceeded') || errorLower.includes('exceed'))) ||
         errorLower.includes('429') ||
         errorLower.includes('rate limit') ||
         errorLower.includes('free_tier_requests');
}

// Input validation and sanitization
function validateMessages(messages: unknown): messages is Array<{ role: string; content: string }> {
  if (!Array.isArray(messages)) {
    return false;
  }
  
  // Limit message array size
  if (messages.length > 50) {
    return false;
  }
  
  return messages.every((msg) => {
    if (typeof msg !== 'object' || msg === null) return false;
    if (!('role' in msg) || !('content' in msg)) return false;
    if (typeof msg.role !== 'string' || typeof msg.content !== 'string') return false;
    // Limit individual message content length
    if (msg.content.length > 10000) return false;
    return true;
  });
}

// Sweet error messages collection
const SWEET_ERROR_MESSAGES = [
  '🌟 "Every cloud has a silver lining!" 🌟 Something went wrong, but don\'t worry - let\'s try again!',
  '💫 "Mistakes are proof that you\'re trying!" 💫 Oops! Let\'s give it another shot, shall we?',
  '✨ "The only way to do great work is to love what you do!" ✨ Something hiccupped, but I\'m here for you - try again!',
  '🌙 "Stars can\'t shine without darkness!" 🌙 A little bump in the road, but we\'ll get through this together!',
  '☀️ "Every day is a fresh start!" ☀️ Something unexpected happened, but let\'s start fresh!',
];

function getRandomSweetMessage(): string {
  return SWEET_ERROR_MESSAGES[Math.floor(Math.random() * SWEET_ERROR_MESSAGES.length)];
}

// Sanitize error messages to prevent information leakage
function sanitizeError(error: unknown): string {
  if (error == null) {
    return getRandomSweetMessage();
  }
  
  if (typeof error === 'string') {
    // Don't expose internal error details
    if (error.includes('API key') || error.includes('MISTRAL') || error.includes('GOOGLE')) {
      return '🔐 "Security is not a product, but a process!" 🔐 Everything is secure, but something needs attention. Please try again in a moment!';
    }
    return getRandomSweetMessage();
  }
  
  if (error instanceof Error) {
    const message = error.message;
    // Don't expose API keys, tokens, or internal paths
    if (message.includes('API key') || message.includes('MISTRAL') || message.includes('GOOGLE') || 
        message.includes('token') || message.includes('secret') || message.includes('password')) {
      return '🔐 "Security is not a product, but a process!" 🔐 Everything is secure, but something needs attention. Please try again in a moment!';
    }
    // Don't expose stack traces or file paths
    if (message.includes('at ') || message.includes('/') || message.includes('\\')) {
      return getRandomSweetMessage();
    }
    return getRandomSweetMessage();
  }
  
  return getRandomSweetMessage();
}

export async function POST(req: Request) {
  try {
    // Check content type
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid content type', 
          message: '📝 "The right format makes all the difference!" 📝 Let me know what you\'d like to chat about, and I\'ll make sure we\'re on the same page! 😊' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check request size (limit to 1MB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 1024 * 1024) {
      return new Response(
        JSON.stringify({ 
          error: 'Request too large', 
          message: '📦 "Less is more!" 📦 That\'s quite a lot to process at once! Could you break it into smaller messages? I\'m here to listen! 💬' 
        }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { messages } = body;

    // Validate messages
    if (!validateMessages(messages)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid messages format', 
          message: '💭 "Communication is key!" 💭 I\'d love to chat, but could you send your message in a simpler format? Let\'s start fresh! 🌟' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Don't log sensitive data in production
    if (process.env.NODE_ENV === 'development') {
      console.log('[CHAT-API] Incoming messages:', messages.length, 'messages');
    }

    // Cast to CoreMessage[] after validation
    const typedMessages: CoreMessage[] = messages as CoreMessage[];
    typedMessages.unshift(SYSTEM_PROMPT);

    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      getSports,
      getCrazy,
      getInternship,
      getWeather,
    };

    // Try Google API first
    try {
      const result = streamText({
        model: google('gemini-2.0-flash'),
        messages: typedMessages,
        toolCallStreaming: true,
        tools,
        maxSteps: 2,
      });

      return result.toDataStreamResponse({
        getErrorMessage: (error) => {
          // Check if it's a quota error and provide better message
          if (isQuotaExceeded(error)) {
            console.warn('[CHAT-API] Quota error detected during streaming');
            // Return a special error code that the client can detect
            return 'QUOTA_EXCEEDED_GOOGLE';
          }
          return errorHandler(error);
        },
      });
    } catch (googleError) {
      // Check if it's a quota exceeded error
      if (isQuotaExceeded(googleError)) {
        console.warn('[CHAT-API] Google API quota exceeded, falling back to Mistral API');
        
        // Check if Mistral API key is available
        if (!process.env.MISTRAL_API_KEY) {
          console.error('[CHAT-API] MISTRAL_API_KEY not found in environment variables');
          return new Response(
            JSON.stringify({ 
              error: 'SERVICE_UNAVAILABLE',
              message: '🌙 "Good things come to those who wait!" 🌙 I\'m taking a quick break to recharge. Give me a moment, and I\'ll be right back to chat! ✨'
            }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
          );
        }

        // Fallback to Mistral API
        try {
          const result = streamText({
            model: mistral('mistral-large-latest') as any,
            messages: typedMessages,
            toolCallStreaming: true,
            tools,
            maxSteps: 2,
          });

          return result.toDataStreamResponse({
            getErrorMessage: errorHandler,
          });
        } catch (mistralError) {
          console.error('[CHAT-API] Mistral API also failed:', mistralError);
          
          // Check if Mistral also has quota exceeded
          if (isQuotaExceeded(mistralError)) {
            // Both APIs have quota exceeded - return friendly message
            return new Response(
              JSON.stringify({ 
                error: 'QUOTA_EXCEEDED_BOTH',
                message: 'Hey, present my API quota was reached out. Please come back again after some time. I am waiting for you! 😊'
              }),
              {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
              }
            );
          } else {
            // Mistral failed for other reasons - don't expose internal errors
            console.error('[CHAT-API] Both APIs failed');
            return new Response(
              JSON.stringify({ 
                error: 'SERVICE_ERROR',
                message: '🌊 "Smooth seas do not make skillful sailors!" 🌊 I\'m experiencing some technical waves right now. Let\'s try again in a moment - I\'ll be here waiting! ⚓'
              }),
              { status: 503, headers: { 'Content-Type': 'application/json' } }
            );
          }
        }
      } else {
        // If it's not a quota error, throw the original error
        throw googleError;
      }
    }
  } catch (err) {
    // Log full error for debugging but don't expose to client
    console.error('[CHAT-API] Global error:', err);
    const safeErrorMessage = sanitizeError(err);
    
    // Return sanitized error response with sweet message
    return new Response(
      JSON.stringify({ 
        error: 'INTERNAL_ERROR',
        message: safeErrorMessage 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
