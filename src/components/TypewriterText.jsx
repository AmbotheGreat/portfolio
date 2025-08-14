import React, { useState, useEffect, useCallback, useMemo } from 'react';

const TypewriterText = React.memo(({ text, speed = 50, cursor = true, loop = false, delay = 1000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Memoize text array processing
  const { textArray, currentText, flattenedText } = useMemo(() => {
    const textArray = Array.isArray(text) && Array.isArray(text[0]) ? text : [text];
    const currentText = textArray[currentTextIndex];
    
    // Flatten the current text array and convert to string for typing
    const flattenedText = Array.isArray(currentText) 
      ? currentText.map(item => typeof item === 'string' ? item : item.props.children).join('')
      : currentText;

    return { textArray, currentText, flattenedText };
  }, [text, currentTextIndex]);

  // Memoize the typing effect logic
  const handleTyping = useCallback(() => {
    if (!isDeleting && currentIndex < flattenedText.length) {
      // Typing forward
      setDisplayText(prev => prev + flattenedText[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting backward
      setDisplayText(prev => prev.slice(0, -1));
      setCurrentIndex(prev => prev - 1);
    } else if (!isDeleting && currentIndex >= flattenedText.length) {
      // Finished typing, wait then start deleting
      setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && currentIndex === 0) {
      // Finished deleting, move to next text
      setTimeout(() => {
        setIsDeleting(false);
        setCurrentTextIndex(prev => (prev + 1) % textArray.length);
      }, 500);
    }
  }, [currentIndex, flattenedText, speed, isDeleting, delay, textArray.length]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [handleTyping, speed]);

  useEffect(() => {
    if (cursor) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorTimer);
    }
  }, [cursor]);

  // Reset when text changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsDeleting(false);
  }, [currentTextIndex]);

  // Memoize the render function
  const renderTypedText = useCallback(() => {
    if (!Array.isArray(currentText)) {
      return displayText;
    }

    let currentLength = 0;
    const result = [];

    currentText.forEach((item, index) => {
      if (typeof item === 'string') {
        const itemLength = item.length;
        if (currentLength + itemLength <= displayText.length) {
          // Full string is typed
          result.push(item);
        } else if (currentLength < displayText.length) {
          // Partial string is typed
          const remainingChars = displayText.length - currentLength;
          result.push(item.substring(0, remainingChars));
        }
        currentLength += itemLength;
      } else {
        // JSX element
        const itemLength = item.props.children.length;
        if (currentLength + itemLength <= displayText.length) {
          // Full JSX element should be shown
          result.push(React.cloneElement(item, { key: index }));
        } else if (currentLength < displayText.length) {
          // Partial JSX element
          const remainingChars = displayText.length - currentLength;
          const partialText = item.props.children.substring(0, remainingChars);
          result.push(
            React.cloneElement(item, { 
              key: index,
              children: partialText 
            })
          );
        }
        currentLength += itemLength;
      }
    });

    return result;
  }, [currentText, displayText]);

  return (
    <span>
      {renderTypedText()}
      {cursor && showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
});

TypewriterText.displayName = 'TypewriterText';

export default TypewriterText; 