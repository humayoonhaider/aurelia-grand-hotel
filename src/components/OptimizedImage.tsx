import React, { useState, useEffect, useRef } from 'react';
import { ImageOff } from 'lucide-react';
import { getBlurPlaceholder } from '../utils/imagePlaceholders';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'auto' | '16/9' | '16/10' | '4/3' | '1/1' | '21/9';
  priority?: boolean;
  placeholderSrc?: string;
  fallbackTitle?: string;
  blurThreshold?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'auto',
  priority = false,
  placeholderSrc,
  fallbackTitle,
  ...props
}) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(priority);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Derive blur placeholder data URI
  const blurPlaceholder = placeholderSrc || getBlurPlaceholder(src);

  // IntersectionObserver for lazy loading with eager prefetch margin (250px)
  useEffect(() => {
    if (priority || isIntersecting) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '250px 0px',
        threshold: 0.01,
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, isIntersecting]);

  // Reset loaded state if src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '16/10'
      ? 'aspect-[16/10]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : aspectRatio === '21/9'
      ? 'aspect-[21/9]'
      : '';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-stone-900 ${aspectClass} ${containerClassName}`}
    >
      {/* 1. Low-Quality Blur-Up Placeholder Layer */}
      {!hasError && (
        <img
          src={blurPlaceholder}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover scale-110 blur-xl transition-opacity duration-700 pointer-events-none ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* 2. Shimmer overlay while pending */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse pointer-events-none" />
      )}

      {/* 3. Full Resolution Image with Blur-Up Transition */}
      {!hasError ? (
        (isIntersecting || priority) && (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-[filter,opacity,transform] ${
              isLoaded
                ? 'opacity-100 filter-none scale-100'
                : 'opacity-0 filter blur-md scale-105'
            } ${className}`}
            {...props}
          />
        )
      ) : (
        <div className="w-full h-full min-h-[160px] flex flex-col items-center justify-center bg-stone-900 text-stone-400 p-6 text-center">
          <ImageOff className="w-8 h-8 text-[#A67C52] mb-2" />
          <span className="text-xs font-serif-luxury text-stone-200">
            {fallbackTitle || alt}
          </span>
          <span className="text-[10px] text-stone-500 uppercase tracking-wider mt-1 font-mono">
            Aurelia Grand Islamabad
          </span>
        </div>
      )}
    </div>
  );
};
