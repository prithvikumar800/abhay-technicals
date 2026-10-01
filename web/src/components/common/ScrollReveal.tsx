'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  animation?: 'fade-up' | 'scale-in' | 'fade-in';
}

export function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  threshold = 0.1,
  animation = 'fade-up',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is unavailable or user prefers reduced motion, reveal immediately
    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            setTimeout(() => setIsVisible(true), delayMs);
          } else {
            setIsVisible(true);
          }
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [delayMs, threshold]);

  const animationClasses = {
    'fade-up': isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-6',
    'scale-in': isVisible
      ? 'opacity-100 scale-100'
      : 'opacity-0 scale-95',
    'fade-in': isVisible
      ? 'opacity-100'
      : 'opacity-0',
  }[animation];

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${animationClasses} ${className}`}
    >
      {children}
    </div>
  );
}
