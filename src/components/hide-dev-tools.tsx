'use client';

import { useEffect } from 'react';

export function HideDevTools() {
  useEffect(() => {
    function removeNextJSButton() {
      // Use the exact CSS selector path provided by user
      const exactButton = document.querySelector('div > div > div > div:nth-child(2) > div > button[data-nextjs-dev-tools-button]');
      if (exactButton) {
        exactButton.remove();
      }
      
      // Also try without nth-child specificity
      const buttonVariations = [
        'div > div > div > div > div > button[data-nextjs-dev-tools-button]',
        'div > div > div > div:nth-child(2) > div > button',
        'button[data-nextjs-dev-tools-button]',
        'button[data-next-mark="true"]'
      ];
      buttonVariations.forEach(selector => {
        try {
          const buttons = document.querySelectorAll(selector);
          buttons.forEach(btn => {
            if (btn.getAttribute('data-nextjs-dev-tools-button') || 
                btn.getAttribute('data-next-mark') === 'true') {
              btn.remove();
            }
          });
        } catch (e) {}
      });
      
      // First, remove all SVGs with Next.js logo markers
      const nextjsSvgs = document.querySelectorAll('svg[data-next-mark-loading]');
      nextjsSvgs.forEach(svg => {
        // Remove the SVG and its parent button/container
        const parent = svg.closest('button') || svg.parentElement;
        if (parent) {
          parent.remove();
        } else {
          svg.remove();
        }
      });
      
      // Also check for SVGs with Next.js logo paths
      const allSvgs = document.querySelectorAll('svg');
      allSvgs.forEach(svg => {
        const hasNextLogo = svg.querySelector('path[class*="paused"]') && 
                           svg.querySelector('defs linearGradient[id*="next_logo"]');
        if (hasNextLogo || svg.getAttribute('data-next-mark-loading') !== null) {
          const parent = svg.closest('button') || svg.parentElement;
          if (parent) {
            parent.remove();
          } else {
            svg.remove();
          }
        }
      });
      
      // Remove by multiple selectors - be very aggressive
      const selectors = [
        'button[data-nextjs-dev-tools-button]',
        'button[data-next-mark]',
        'button[data-next-mark="true"]',
        'button[data-next-mark="false"]',
        'button[aria-label*="Next.js"]',
        'button[aria-label*="Dev Tools"]',
        'button[aria-controls="nextjs-dev-tools-menu"]',
        'button[aria-haspopup="menu"]',
        '[data-nextjs-dev-tools]',
        '#nextjs-dev-tools-menu',
        '[id*="nextjs"]',
        '[class*="nextjs"]',
        // Remove the menu/popup
        '[role="menu"]',
        '[aria-labelledby*="nextjs"]',
      ];
      
      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            // Check if it's related to Next.js dev tools
            const text = el.textContent || '';
            const hasNextJSContent = text.includes('Route') && text.includes('Static') ||
                                   text.includes('Turbopack') ||
                                   text.includes('Preferences');
            
            if (hasNextJSContent || 
                el.getAttribute('data-nextjs-dev-tools-button') ||
                el.getAttribute('data-next-mark') ||
                el.getAttribute('aria-controls') === 'nextjs-dev-tools-menu') {
              el.remove();
            }
          });
        } catch (e) {
          // Some selectors might not be supported, ignore
        }
      });
      
      // Check all buttons more thoroughly
      const allButtons = document.querySelectorAll('button');
      allButtons.forEach(btn => {
        const hasNextJS = btn.getAttribute('data-nextjs-dev-tools-button') || 
                         btn.getAttribute('data-next-mark') ||
                         btn.getAttribute('aria-controls') === 'nextjs-dev-tools-menu' ||
                         btn.getAttribute('aria-haspopup') === 'menu' ||
                         (btn.getAttribute('aria-label') && btn.getAttribute('aria-label')?.includes('Next.js')) ||
                         (btn.getAttribute('aria-label') && btn.getAttribute('aria-label')?.includes('Dev Tools'));
        
        // Also check if button contains SVG with Next.js logo - be very thorough
        const svg = btn.querySelector('svg');
        if (svg) {
          const hasNextMark = svg.getAttribute('data-next-mark-loading') !== null;
          const hasPausedPath = svg.querySelector('path[class*="paused"]') !== null;
          const hasNextLogoGradient = svg.querySelector('defs linearGradient[id*="next_logo"]') !== null;
          const hasNextMask = svg.querySelector('mask[id*="next_logo"]') !== null;
          const viewBox = svg.getAttribute('viewBox');
          const isNextJSLogo = viewBox === '0 0 40 40' && (hasNextMark || hasPausedPath || hasNextLogoGradient);
          
          if (hasNextMark || hasPausedPath || hasNextLogoGradient || hasNextMask || isNextJSLogo) {
            btn.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; position: fixed !important; left: -9999px !important; width: 0 !important; height: 0 !important;';
            btn.remove();
            return;
          }
        }
        
        if (hasNextJS) {
          btn.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; position: fixed !important; left: -9999px !important; width: 0 !important; height: 0 !important;';
          btn.remove();
        }
      });
      
      // Remove any popup menus that might be open - check all divs
      const allDivs = document.querySelectorAll('div');
      allDivs.forEach(div => {
        const text = div.textContent || '';
        const style = window.getComputedStyle(div);
        const isPopup = style.position === 'fixed' || style.position === 'absolute';
        const hasMenuRole = div.getAttribute('role') === 'menu';
        
        // Check if it's the Next.js dev tools menu
        const isNextJSMenu = (
          (text.includes('Route') && text.includes('Static')) ||
          (text.includes('Turbopack') && text.includes('arrow')) ||
          (text.includes('Preferences') && text.includes('gear'))
        ) && (isPopup || hasMenuRole);
        
        if (isNextJSMenu) {
          div.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important;';
          div.remove();
        }
      });
      
      // Also check for any elements with specific Next.js menu content
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const text = el.textContent || '';
        if ((text.includes('Route') && text.includes('Static') && text.length < 100) ||
            (text.includes('Try Turbopack') && text.length < 50) ||
            (text.includes('Preferences') && text.length < 50)) {
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed' || style.position === 'absolute') {
            el.remove();
          }
        }
      });
    }
    
    // Run immediately
    removeNextJSButton();
    
    // Run on next tick
    setTimeout(removeNextJSButton, 0);
    
    // Run multiple times with delays - very aggressive
    const intervals = [0, 10, 20, 30, 50, 100, 200, 500, 1000, 2000, 3000, 5000];
    intervals.forEach(delay => {
      setTimeout(removeNextJSButton, delay);
    });
    
    // Continuous monitoring - EXTREMELY frequent (every 1ms for first 2 seconds, then every 5ms)
    let rapidCount = 0;
    let slowInterval: NodeJS.Timeout | null = null;
    const rapidInterval = setInterval(() => {
      removeNextJSButton();
      rapidCount++;
      if (rapidCount > 2000) {
        clearInterval(rapidInterval);
        slowInterval = setInterval(removeNextJSButton, 5);
      }
    }, 1);
    
    // Watch for dynamically added elements - very aggressive
    const observer = new MutationObserver(() => {
      removeNextJSButton();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['data-nextjs-dev-tools-button', 'data-next-mark', 'aria-controls', 'aria-haspopup', 'aria-expanded']
    });
    
    observer.observe(document.documentElement, { 
      childList: true, 
      subtree: true,
      attributes: true
    });
    
    // Also prevent clicks on the button area
    const preventClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (
        target.getAttribute('data-nextjs-dev-tools-button') ||
        target.getAttribute('data-next-mark') ||
        target.closest('button[data-nextjs-dev-tools-button]') ||
        target.closest('button[data-next-mark]')
      )) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };
    
    document.addEventListener('click', preventClick, true);
    document.addEventListener('mousedown', preventClick, true);
    
    return () => {
      clearInterval(rapidInterval);
      if (slowInterval) {
        clearInterval(slowInterval);
      }
      observer.disconnect();
      document.removeEventListener('click', preventClick, true);
      document.removeEventListener('mousedown', preventClick, true);
    };
  }, []);

  return null;
}

