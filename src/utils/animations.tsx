
import React, { useEffect, useState } from 'react';

type TransitionProps = {
  show: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export const FadeIn = ({ 
  show, 
  duration = 300, 
  delay = 0, 
  className = '', 
  children 
}: TransitionProps) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (show) {
      setShouldRender(true);
    } else {
      timeoutId = setTimeout(() => setShouldRender(false), duration);
    }
    return () => clearTimeout(timeoutId);
  }, [show, duration]);

  if (!shouldRender) return null;

  return (
    <div
      className={`transition-opacity duration-${duration} ease-in-out ${className} ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const useInView = (threshold = 0.1): [React.RefObject<HTMLDivElement>, boolean] => {
  const [isInView, setIsInView] = useState(false);
  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return [ref, isInView];
};

export const useImageLoad = (src: string): [boolean, boolean] => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setIsError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return [isLoaded, isError];
};
