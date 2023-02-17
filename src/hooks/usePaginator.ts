import { useEffect, useState, useCallback, useRef } from 'react';
import { httpGet } from '../util/http';

export const NEXT = {
  START: 1,
  END: -1,
};

function useFetchPage(fetchUrl: string, nextCursor: number, option: { pageSize: number; filter: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState<any>([]);
  const [nextPageNum, setNextPageNum] = useState(nextCursor);

  useEffect(() => {
    setPage([]);
  }, [fetchUrl, option.filter]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchUrlwithNext = `${fetchUrl}?page=${nextCursor}&pageSize=${option.pageSize}${option.filter}`;
    httpGet(fetchUrlwithNext)
      .then((res) => {
        if (res.length === 0) {
          setNextPageNum(-1);
        } else {
          setNextPageNum(nextCursor + 1);
        }
        setPage([...page, ...res]);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchUrl, nextCursor]);

  return { loading, error, page, nextPageNum };
}

export default function usePaginator(
  url: string,
  option: { pageSize: number; filter: string } = { pageSize: 10, filter: '' }
) {
  const [nextCursor, setNextCursor] = useState(NEXT.START);
  const { loading, error, page, nextPageNum } = useFetchPage(url, nextCursor, option);

  const observer = useRef<IntersectionObserver>();
  const observeElementRef = useCallback(
    (observeTarget: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageNum !== NEXT.END) {
          setNextCursor(nextPageNum);
        }
      });
      if (observeTarget) observer.current.observe(observeTarget);
    },
    [loading, nextPageNum !== NEXT.END]
  );
  return { loading, error, page, observeElementRef };
}
