import { useEffect, useRef } from "react";

type CallbackFunction = () => void;

const useInfiniteScroll = (
  callback: CallbackFunction,
  isLoading: boolean,
  hasMore: boolean,
  stop: boolean
): React.MutableRefObject<HTMLDivElement | null> => {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerTarget.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isLoading || !hasMore || stop) return;
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [observerTarget, callback, isLoading, hasMore, stop]);

  return observerTarget;
};

export default useInfiniteScroll;
