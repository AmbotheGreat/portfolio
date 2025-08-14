import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createIntersectionObserver, preloadImage } from '../utils/performance';

const OptimizedImage = React.memo(({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  onLoad,
  onError,
  priority = false,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  const loadImage = useCallback(async () => {
    if (!src || imageError) return;

    try {
      await preloadImage(src);
      setImageLoaded(true);
      onLoad?.();
    } catch (error) {
      console.error('Failed to load image:', src, error);
      setImageError(true);
      onError?.();
    }
  }, [src, imageError, onLoad, onError]);

  useEffect(() => {
    if (priority) {
      loadImage();
      return;
    }

    if (!imgRef.current) return;

    observerRef.current = createIntersectionObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          loadImage();
          // Disconnect observer after loading
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority, loadImage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (imageError) {
    return (
      <div 
        ref={imgRef}
        className={`${className} bg-gray-200 flex items-center justify-center text-gray-500`}
        {...props}
      >
        <span>Image not available</span>
      </div>
    );
  }

  if (!isInView && !priority) {
    return (
      <div 
        ref={imgRef}
        className={`${className} bg-gray-100 animate-pulse`}
        {...props}
      >
        {placeholder && (
          <img 
            src={placeholder} 
            alt="Placeholder" 
            className="w-full h-full object-cover opacity-50"
          />
        )}
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      style={{ 
        transition: 'opacity 0.3s ease-in-out',
        ...props.style 
      }}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 