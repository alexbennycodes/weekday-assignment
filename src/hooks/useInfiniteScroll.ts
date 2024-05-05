import { useEffect, useRef } from "react";

type CallbackFunction = () => void;

const useInfiniteScroll = (
  callback: CallbackFunction,
  isLoading: boolean,
  hasMore: boolean
): React.MutableRefObject<HTMLDivElement | null> => {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isLoading || !hasMore) return;
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, callback, isLoading, hasMore]);

  return observerTarget;
};

export default useInfiniteScroll;
