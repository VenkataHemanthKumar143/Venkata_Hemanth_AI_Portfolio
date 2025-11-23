'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function RefreshRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hasCheckedRef.current) return;

    // Only check once on initial mount
    hasCheckedRef.current = true;

    // Capture current pathname at mount time
    const currentPathname = pathname;

    // Check if this is a page refresh/reload
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isReload = navigationEntry?.type === 'reload';

    // If it's a refresh and we're not on the home page, redirect to home
    if (isReload && currentPathname !== '/') {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return null;
}

