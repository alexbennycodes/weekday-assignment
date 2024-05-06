import { useEffect, useRef } from "react";

type CallbackFunction = () => void;

const useInfiniteScroll = (
  callback: CallbackFunction, // Callback function to be executed on scroll
  isLoading: boolean, // Boolean indicating whether data is currently being loaded
  hasMore: boolean, // Boolean indicating whether there is more data to load
  stop: boolean // Boolean indicating whether to stop observing scroll events
): React.MutableRefObject<HTMLDivElement | null> => {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerTarget.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isLoading || !hasMore || stop) return;
        if (entries[0].isIntersecting) {
          // Execute the callback function when target element is intersecting
          callback();
        }
      },
      { threshold: 1 } // Set threshold to 1 to trigger when target is in view
    );

    if (target) {
      observer.observe(target);
    }

    // Cleanup function to stop observing when component unmounts or target changes
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [observerTarget, callback, isLoading, hasMore, stop]);

  return observerTarget;
};

export default useInfiniteScroll;
