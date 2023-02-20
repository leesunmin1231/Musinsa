import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { filters } from '../atom';
import { httpGet } from '../util/http';
import { getFilterQueryString } from '../util/filterQueryString';
import { getRenderPageIndex } from '../util/getRenderPageIndex';
import useModal from './useModal';
import type { CharacterType } from '../types/CharacterType';
import type { RenderCharacterList, ResponseCharacterList } from '../types/PageType';

const initRenderPageData: RenderCharacterList = {
  prevPage: [],
  allRenderList: [],
};

interface ResponseError {
  code: string;
  message: string;
}

interface PageOption {
  startPage: number;
  pageSize: number;
}

const initResponsePageData: ResponseCharacterList = { allResponseList: [], newPage: [] };

function useCharacterFilter(pageSize: number, responsePage: ResponseCharacterList) {
  const filterList = useRecoilValue(filters);
  const queryStringFilter = getFilterQueryString(filterList);
  const [renderPage, setRenderPage] = useState<RenderCharacterList>(initRenderPageData);

  const setNewRenderPage = (render: CharacterType[]) => {
    const pageIndex = getRenderPageIndex(render.length, pageSize, responsePage.newPage.length);
    setRenderPage({
      ...renderPage,
      allRenderList: render.slice(0, pageIndex.renderPageIndex),
      prevPage: render.slice(pageIndex.renderPageIndex, pageIndex.totalLength),
    });
  };

  useEffect(() => {
    if (filterList.noTvSeries.clicked) {
      const render = [
        ...renderPage.allRenderList,
        ...renderPage.prevPage,
        ...responsePage.newPage.filter((character) => character.tvSeries.join('').length === 0),
      ];
      setNewRenderPage(render);
      return;
    }
    setRenderPage({ ...renderPage, allRenderList: [...responsePage.allResponseList] });
  }, [responsePage, filterList]);

  useEffect(() => {
    if (filterList.noTvSeries.clicked) {
      const render = responsePage.allResponseList.filter((character) => character.tvSeries.join('').length === 0);
      setNewRenderPage(render);
    }
  }, [filterList.noTvSeries.clicked]);
  return { queryStringFilter, renderPage: renderPage.allRenderList, setRenderPage };
}

function useFetchPage(url: string, option: PageOption) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setContent, closeModal } = useModal();
  const [responsePage, setResponsePage] = useState<ResponseCharacterList>(initResponsePageData);
  const { queryStringFilter, renderPage, setRenderPage } = useCharacterFilter(option.pageSize, responsePage);
  const getPageData = async ({ pageParam = option.startPage }) => {
    const response: CharacterType[] = await httpGet(
      `${url}?${queryStringFilter}page=${pageParam}&pageSize=${option.pageSize}`
    );
    return {
      responseList: response,
      currentPage: pageParam,
    };
  };
  const fetchErrorHandler = (error: ResponseError) => {
    setContent(`ERROR: ${error.message}`, [
      {
        name: '확인',
        handler: () => {
          navigate('/404', { state: error.message });
          closeModal();
        },
      },
    ]);
  };
  const fetchSuccessHandler = (pages: { responseList: CharacterType[]; currentPage: number }[]) => {
    const newPage = pages.at(-1);
    if (newPage) {
      setResponsePage({
        ...responsePage,
        newPage: newPage.responseList,
        allResponseList: [...responsePage.allResponseList, ...newPage.responseList],
      });
    }
  };

  const { fetchNextPage, isLoading, hasNextPage, isFetching } = useInfiniteQuery(
    ['characters', queryStringFilter],
    getPageData,
    {
      refetchOnWindowFocus: true,
      staleTime: 3 * 60 * 1000,
      retry: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.responseList.length === 0) return undefined;
        return lastPage.currentPage + 1;
      },
      onError: (error: ResponseError) => fetchErrorHandler(error),
      onSuccess: (data) => fetchSuccessHandler(data.pages),
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries(['characters', queryStringFilter]);
    setResponsePage({ allResponseList: [], newPage: [] });
    setRenderPage({ allRenderList: [], prevPage: [] });
  }, [queryStringFilter]);

  return { isLoading, renderPage, fetchNextPage, hasNextPage, isFetching };
}

export default function usePaginator(url: string, option: PageOption) {
  const observer = useRef<IntersectionObserver>();
  const { isLoading, renderPage, fetchNextPage, hasNextPage, isFetching } = useFetchPage(url, option);

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
    [isLoading, hasNextPage, renderPage]
  );

  return { isLoading, isFetching, renderPage, observeElementRef };
}
