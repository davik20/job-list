import { useRef, useEffect } from 'react';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  isLoading: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ onLoadMore, isLoading }) => {
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('is intersecting')
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [isLoading, onLoadMore]);

  return <div ref={loader} style={{ height: '50px', width: '100%' }} />;
};

export default InfiniteScroll;
