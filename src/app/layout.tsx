import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { HideDevTools } from "@/components/hide-dev-tools";
import RefreshRedirect from "@/components/refresh-redirect";
import Script from "next/script";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Venkata Hemanth Kumar Portfolio",
  description: "Interactive portfolio with an AI-powered Memoji that answers questions about me, my skills, and my experience",
  keywords: [
    "Venkata Hemanth Kumar", 
    "Portfolio", 
    "Developer", 
    "AI", 
    "Interactive", 
    "Memoji", 
    "Web Development",
    "Full Stack",
    "Next.js",
    "React"
  ],
  authors: [
    {
      name: "Venkata Hemanth Kumar",
      url: "https://github.com/VenkataHemanthKumar143",
    },
  ],
  creator: "Venkata Hemanth Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/VenkataHemanthKumar143",
    title: "Venkata Hemanth Kumar Portfolio",
    description: "Interactive portfolio with an AI-powered Memoji that answers questions about me",
    siteName: "Venkata Hemanth Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venkata Hemanth Kumar Portfolio",
    description: "Interactive portfolio with an AI-powered Memoji that answers questions about me",
    creator: "@HemanthKumar724",
  },
  icons: {
    icon: [
      {
        url: "/star.png",
        sizes: "any",
      }
    ],
    shortcut: "/star.png?v=2",
    apple: "/apple-touch-icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/star.png" sizes="any" />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QTH2CN2YRQ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window['dataLayer'] = window['dataLayer'] || [];
              function gtag(){window['dataLayer'].push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QTH2CN2YRQ');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function killNextJSButton() {
                  // ULTRA AGGRESSIVE REMOVAL - Remove immediately and continuously
                  const kill = function() {
                    // Remove by exact path
                    const exact = document.querySelector('div > div > div > div:nth-child(2) > div > button[data-nextjs-dev-tools-button]');
                    if (exact) { exact.remove(); }
                    
                    // Remove all buttons with Next.js attributes
                    document.querySelectorAll('button[data-nextjs-dev-tools-button], button[data-next-mark], button[data-next-mark="true"], button[aria-label*="Next.js"], button[aria-label*="Dev Tools"], button[aria-controls="nextjs-dev-tools-menu"]').forEach(b => b.remove());
                    
                    // Find by SVG content - check ALL buttons
                    document.querySelectorAll('button').forEach(btn => {
                      const svg = btn.querySelector('svg');
                      if (svg) {
                        const hasNextMark = svg.getAttribute('data-next-mark-loading') !== null;
                        const viewBox = svg.getAttribute('viewBox');
                        const hasPaused = svg.querySelector('path[class*="paused"]');
                        const hasNextLogo = svg.querySelector('defs linearGradient[id*="next_logo"]');
                        const hasNextMask = svg.querySelector('mask[id*="next_logo"]');
                        
                        if (hasNextMark || (viewBox === '0 0 40 40' && (hasPaused || hasNextLogo || hasNextMask))) {
                          btn.remove();
                        }
                      }
                    });
                    
                    // Remove ALL menus with Next.js content
                    document.querySelectorAll('[role="menu"], #nextjs-dev-tools-menu, [aria-controls="nextjs-dev-tools-menu"]').forEach(m => {
                      const text = m.textContent || '';
                      if (text.includes('Route') || text.includes('Turbopack') || text.includes('Preferences') || text.includes('Static')) {
                        m.remove();
                      }
                    });
                    
                    // Remove any divs containing the menu items
                    document.querySelectorAll('div').forEach(div => {
                      const text = div.textContent || '';
                      const style = window.getComputedStyle(div);
                      if ((style.position === 'fixed' || style.position === 'absolute') && 
                          (text.includes('Route') && text.includes('Static') || 
                           text.includes('Try Turbopack') || 
                           text.includes('Preferences'))) {
                        div.remove();
                      }
                    });
                  };
                  
                  // Run immediately
                  kill();
                  
                  // Run continuously every 1ms for first 3 seconds, then every 5ms forever
                  let count = 0;
                  const fastInterval = setInterval(() => {
                    kill();
                    count++;
                    if (count > 3000) {
                      clearInterval(fastInterval);
                      setInterval(kill, 5);
                    }
                  }, 1);
                  
                  // MutationObserver - watch EVERYTHING
                  const obs = new MutationObserver(() => {
                    kill();
                  });
                  
                  if (document.documentElement) {
                    obs.observe(document.documentElement, {
                      childList: true,
                      subtree: true,
                      attributes: true,
                      attributeFilter: ['data-nextjs-dev-tools-button', 'data-next-mark', 'aria-controls', 'aria-haspopup']
                    });
                  }
                  
                  // Watch body when it exists
                  const watchBody = () => {
                    if (document.body) {
                      obs.observe(document.body, {
                        childList: true,
                        subtree: true,
                        attributes: true
                      });
                    } else {
                      setTimeout(watchBody, 5);
                    }
                  };
                  watchBody();
                  
                  // Prevent ALL interactions
                  ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'].forEach(eventType => {
                    document.addEventListener(eventType, (e) => {
                      const t = e.target;
                      if (t && (t.closest('button[data-nextjs-dev-tools-button]') || 
                                t.closest('button[data-next-mark]') ||
                                t.closest('[aria-controls="nextjs-dev-tools-menu"]'))) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        e.stopPropagation();
                        kill();
                        return false;
                      }
                    }, true);
                  });
                }
                
                // Start immediately - multiple times
                killNextJSButton();
                setTimeout(killNextJSButton, 0);
                setTimeout(killNextJSButton, 10);
                
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', killNextJSButton);
                }
                window.addEventListener('load', killNextJSButton);
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          // "min-h-screen bg-background font-sans antialiased",
          "min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans antialiased transition-colors duration-500 ease-in-out",
          inter.variable,
        )}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function instantKill() {
                  const btn = document.querySelector('button[data-nextjs-dev-tools-button], button[data-next-mark="true"]');
                  if (btn) btn.remove();
                  document.querySelectorAll('svg[data-next-mark-loading]').forEach(svg => {
                    const parent = svg.closest('button');
                    if (parent) parent.remove();
                  });
                }
                instantKill();
                setInterval(instantKill, 1);
                new MutationObserver(instantKill).observe(document.body || document.documentElement, {
                  childList: true,
                  subtree: true
                });
              })();
            `,
          }}
        />
        <HideDevTools />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <RefreshRedirect />
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}