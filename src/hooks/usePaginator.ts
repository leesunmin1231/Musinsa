import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useState, useRef, useCallback } from 'react';
import { httpGet } from '../util/http';
import type { CharacterType } from '../types/CharacterType';

export default function usePaginator(url: string, option: { pageSize: number; filter: string }) {
  const [page, setPage] = useState<CharacterType[]>([]);
  const queryClient = useQueryClient();
  const observer = useRef<IntersectionObserver>();

  const getPageData = async ({ pageParam = 1 }) => {
    const response: CharacterType[] = await httpGet(
      `${url}?${option.filter}page=${pageParam}&pageSize=${option.pageSize}`
    );
    return {
      page: response,
      current_page: pageParam,
    };
  };
  const { fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(['characters', option.filter], getPageData, {
    refetchOnWindowFocus: true,
    staleTime: 3 * 60 * 1000,
    getNextPageParam: (lastPage) => lastPage.current_page + 1,
    onSuccess: (data) => {
      setPage(data.pages.map((item) => item.page).flat());
    },
    onSettled: () => {
      queryClient.invalidateQueries(['characters', option.filter]);
    },
  });
  const observeElementRef = useCallback(
    (observeTarget: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (observeTarget) observer.current.observe(observeTarget);
    },
    [isLoading, hasNextPage]
  );

  return { isLoading, page, observeElementRef };
}
