export async function GET(req: Request) {
  try {
    // Validate request origin (optional - can be configured)
    const origin = req.headers.get('origin');
    const referer = req.headers.get('referer');
    
    // Basic validation - ensure request comes from same origin or allowed origins
    // In production, you might want to add CORS validation here
    
    const repoUrl = 'https://api.github.com/repos/VenkataHemanthKumar143/Venkata_AI_Portfolio';
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App/1.0', // GitHub API requires User-Agent
    };

    // Add token if available (never expose in error messages)
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const res = await fetch(repoUrl, { 
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        // Don't expose GitHub API errors to client
        console.error('[GITHUB-API] Failed to fetch stars:', res.status);
        return Response.json({ stars: 0 }, { status: 200 });
      }

      const data = await res.json();
      // Validate response data
      const stars = typeof data.stargazers_count === 'number' ? data.stargazers_count : 0;
      return Response.json({ stars });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    // Don't expose internal errors
    console.error('[GITHUB-API] Error:', error);
    return Response.json({ stars: 0 }, { status: 200 });
  }
}