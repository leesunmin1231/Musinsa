import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useState, useRef, useCallback, useEffect } from 'react';
import { filters } from '../atom';
import { httpGet } from '../util/http';
import { getFilterQueryString } from '../util/filterQueryString';
import type { CharacterType } from '../types/CharacterType';

interface RenderPageDataType {
  prevPage: CharacterType[];
  nextPage: CharacterType[];
  nextPageCursor: number;
  renderList: CharacterType[];
}

const initRenderPageData: RenderPageDataType = {
  prevPage: [],
  nextPage: [],
  nextPageCursor: 0,
  renderList: [],
};

export default function usePaginator(url: string, option: { pageSize: number }) {
  const [responsePage, setResponsePage] = useState<CharacterType[]>([]);
  const [renderPage, setRenderPage] = useState<RenderPageDataType>(initRenderPageData);
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
      const newPage = data.pages.at(-1);
      if (newPage) {
        setResponsePage([...responsePage, ...newPage.responsePage]);
        setRenderPage({ ...renderPage, nextPage: [...newPage.responsePage] });
      }
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
    [isLoading, hasNextPage, renderPage.renderList]
  );

  const checkPageSize = (totalLength: number, pageSize: number) => {
    const prevPageIndex = totalLength % pageSize;
    if (prevPageIndex === 0) return { totalLength, renderPageIndex: totalLength };
    return { totalLength, renderPageIndex: Math.trunc(totalLength / pageSize) * pageSize };
  };

  useEffect(() => {
    queryClient.invalidateQueries(['characters', queryStringFilter]);
    setRenderPage(initRenderPageData);
    setResponsePage([]);
  }, [queryStringFilter]);

  useEffect(() => {
    if (filterList.noTvSeries.clicked) {
      const render = [
        ...renderPage.renderList,
        ...renderPage.prevPage,
        ...renderPage.nextPage.filter((character) => character.tvSeries.join('').length === 0),
      ];
      const pageIndex = checkPageSize(render.length, option.pageSize);
      setRenderPage({
        ...renderPage,
        renderList: render.slice(0, pageIndex.renderPageIndex),
        prevPage: render.slice(pageIndex.renderPageIndex, pageIndex.totalLength),
        nextPage: [],
      });
      return;
    }
    setRenderPage({ ...renderPage, renderList: [...responsePage] });
  }, [responsePage, filterList]);

  useEffect(() => {
    if (filterList.noTvSeries.clicked) {
      const render = responsePage.filter((character) => character.tvSeries.join('').length === 0);
      const pageIndex = checkPageSize(render.length, option.pageSize);
      setRenderPage({
        ...renderPage,
        renderList: render.slice(0, pageIndex.renderPageIndex),
        prevPage: render.slice(pageIndex.renderPageIndex, pageIndex.totalLength),
        nextPage: [],
      });
    }
  }, [filterList.noTvSeries.clicked]);

  return { isLoading, renderPage: renderPage.renderList, observeElementRef };
}
