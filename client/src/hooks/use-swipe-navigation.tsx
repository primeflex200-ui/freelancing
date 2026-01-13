import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

interface SwipeNavigationOptions {
  threshold?: number;
  preventScroll?: boolean;
}

export function useSwipeNavigation(options: SwipeNavigationOptions = {}) {
  const { threshold = 50, preventScroll = false } = options;
  const [, setLocation] = useLocation();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  // Define page order for navigation
  const pageOrder = [
    '/',
    '/services',
    '/process',
    '/work',
    '/about'
  ];

  const getCurrentPageIndex = () => {
    const currentPath = window.location.pathname;
    return pageOrder.indexOf(currentPath);
  };

  const navigateToPage = (direction: 'left' | 'right') => {
    const currentIndex = getCurrentPageIndex();
    if (currentIndex === -1) return;

    let nextIndex: number;
    if (direction === 'left') {
      // Swipe left = next page
      nextIndex = currentIndex + 1;
    } else {
      // Swipe right = previous page
      nextIndex = currentIndex - 1;
    }

    if (nextIndex >= 0 && nextIndex < pageOrder.length) {
      setLocation(pageOrder[nextIndex]);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;

    if (preventScroll) {
      const deltaX = Math.abs(touchEndX.current - touchStartX.current);
      const deltaY = Math.abs(touchEndY.current - touchStartY.current);
      
      // If horizontal swipe is more significant than vertical, prevent scroll
      if (deltaX > deltaY) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = Math.abs(touchStartY.current - touchEndY.current);

    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        // Swiped left
        navigateToPage('left');
      } else {
        // Swiped right
        navigateToPage('right');
      }
    }

    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
    touchStartY.current = 0;
    touchEndY.current = 0;
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return null;
}
