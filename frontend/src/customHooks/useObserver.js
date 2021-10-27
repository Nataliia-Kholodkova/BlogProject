import { useEffect, useRef } from 'react';

const useObserver = (ref, isLoad, isValid, func) => {
  const observer = useRef();
  useEffect(() => {
    if (isLoad) {
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    const callback = (entries) => {
      if (entries[0].isIntersecting && isValid) {
        func();
      }
    };

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(ref.current);
  }, [isLoad]);
};

export default useObserver;
