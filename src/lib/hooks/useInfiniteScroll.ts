import {
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';

export interface UseInfiniteScrollOptions {
  callback?: () => void,
  triggerRef: MutableRefObject<HTMLElement>,
  wrapperRef: MutableRefObject<HTMLElement>,
}

export function useInifiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (triggerRef.current && wrapperRef.current) {
      const options = {
        root: wrapperRef.current,
        rootMargin: '10px',
        threshold: 1.0,
      }

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback?.()
        }
      }, options);

      observer.current.observe(triggerRef.current);
    }

    return () => {
      observer.current && observer.current.disconnect()
    }
  }, [callback, triggerRef, wrapperRef])
}
