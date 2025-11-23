# Venkata Portfolio - AI Chat Portfolio

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env.local file
touch .env.local

# Add API keys (see below)
# Then run
npm run dev
```

## 🔑 Required API Keys

Create `.env.local` file in root directory:

```env
GOOGLE_API_KEY=your_google_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
```

**Get API Keys:**
- **Google (Gemini)**: https://aistudio.google.com/apikey
- **Mistral**: https://console.mistral.ai/api-keys/

## 🔄 Dual API Logic Flow

### Request Flow:
```
User Message → API Route (/api/chat)
  ↓
1. Try Google Gemini API (gemini-2.0-flash)
  ↓
2. If quota exceeded → Fallback to Mistral API (mistral-large-latest)
  ↓
3. If both fail → Return friendly error message
```

### Message Structure:
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi there!" }
  ]
}
```

### Response:
- **Success**: Streamed text response with tool calls
- **Google Quota Exceeded**: Auto-switch to Mistral
- **Both Quota Exceeded**: User-friendly error message
- **Other Errors**: Sanitized error messages (no API key exposure)

## 📝 Key Features

- **Dual API Fallback**: Google → Mistral if quota exceeded
- **Tool System**: 9 tools (getProjects, getResume, getContact, etc.)
- **Streaming**: Real-time response streaming
- **Error Handling**: Secure, user-friendly error messages
- **Validation**: Request size & message format validation

## 🛠️ Scripts

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/app/api/chat/
  ├── route.ts          # Main API endpoint (dual API logic)
  ├── prompt.ts        # System prompt for AI
  └── tools/           # 9 custom tools
```

## 🔐 Security Notes

- API keys are never exposed in error messages
- Environment variables are git-ignored
- Request validation prevents abuse
- Error sanitization prevents info leakage

