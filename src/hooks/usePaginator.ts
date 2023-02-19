import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useState, useRef, useCallback, useEffect } from 'react';
import { filters } from '../atom';
import { httpGet } from '../util/http';
import { getFilterQueryString } from '../util/filterQueryString';
import type { CharacterType } from '../types/CharacterType';

const checkPageSize = (totalLength: number, pageSize: number): number => {
  if (totalLength % pageSize === 0) return totalLength;
  return Math.trunc(totalLength / pageSize) * pageSize;
};

export default function usePaginator(url: string, option: { pageSize: number }) {
  const [responsePage, setResponsePage] = useState<CharacterType[]>([]);
  const [renderPage, setRenderPage] = useState<CharacterType[]>([]);
  const filterList = useRecoilValue(filters);
  const queryStringFilter = getFilterQueryString(filterList);
  const queryClient = useQueryClient();
  const observer = useRef<IntersectionObserver>();

  const getPageData = async ({ pageParam = 1 }) => {
    const response: CharacterType[] = await httpGet(
      `${url}?${queryStringFilter}page=${pageParam}&pageSize=${option.pageSize}`
    );
    return {
      responsePage: response,
      current_page: pageParam,
    };
  };
  const { fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(['characters', queryStringFilter], getPageData, {
    refetchOnWindowFocus: true,
    staleTime: 3 * 60 * 1000,
    getNextPageParam: (lastPage) => lastPage.current_page + 1,
    onSuccess: (data) => {
      setResponsePage(data.pages.map((item) => item.responsePage).flat());
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

  useEffect(() => {
    queryClient.invalidateQueries(['characters', queryStringFilter]);
  }, [queryStringFilter]);

  useEffect(() => {
    if (filterList.noTvSeries.clicked) {
      const render = responsePage.filter((character) => character.tvSeries.join('').length === 0);
      setRenderPage(render.slice(0, checkPageSize(render.length, option.pageSize)));
      return;
    }
    setRenderPage([...responsePage]);
  }, [responsePage, filterList]);

  return { isLoading, renderPage, observeElementRef };
}
