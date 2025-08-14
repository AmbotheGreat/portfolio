// Performance optimization utilities

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to limit
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Intersection Observer utility for lazy loading
 * @param {Function} callback - Callback function when element is visible
 * @param {Object} options - Intersection Observer options
 * @returns {IntersectionObserver} - The observer instance
 */
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
};

/**
 * Preload image utility
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Batch DOM updates using requestAnimationFrame
 * @param {Function} callback - Function to execute in the next frame
 */
export const batchUpdate = (callback) => {
  requestAnimationFrame(() => {
    callback();
  });
};

/**
 * Memoize function results
 * @param {Function} fn - Function to memoize
 * @returns {Function} - Memoized function
 */
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} - Whether element is in viewport
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get element's distance from viewport top
 * @param {Element} element - DOM element
 * @returns {number} - Distance from viewport top
 */
export const getDistanceFromTop = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.top + window.pageYOffset;
};

/**
 * Smooth scroll to element
 * @param {Element} element - Target element
 * @param {Object} options - Scroll options
 */
export const smoothScrollTo = (element, options = {}) => {
  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    ...options
  };

  element.scrollIntoView(defaultOptions);
};

/**
 * Performance measurement utility
 * @param {string} label - Label for the measurement
 * @param {Function} fn - Function to measure
 * @returns {any} - Result of the function
 */
export const measurePerformance = (label, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label} took ${end - start} milliseconds`);
  return result;
}; 