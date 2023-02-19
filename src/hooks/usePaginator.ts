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

const initResponsePageData: ResponseCharacterList = { allResponseList: [], newPage: [] };

function useCharacterFilter(pageSize: number, responsePage: ResponseCharacterList) {
  const filterList = useRecoilValue(filters);
  const queryStringFilter = getFilterQueryString(filterList);
  const [renderPage, setRenderPage] = useState<RenderCharacterList>(initRenderPageData);

  const setNewRenderPage = (render: CharacterType[]) => {
    const pageIndex = getRenderPageIndex(render.length, pageSize);
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
  return { queryStringFilter, renderPage: renderPage.allRenderList };
}

function useFetchPage(url: string, pageSize: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setContent, closeModal } = useModal();
  const [responsePage, setResponsePage] = useState<ResponseCharacterList>(initResponsePageData);
  const { queryStringFilter, renderPage } = useCharacterFilter(pageSize, responsePage);

  const getPageData = async ({ pageParam = 1 }) => {
    const response: CharacterType[] = await httpGet(
      `${url}?${queryStringFilter}page=${pageParam}&pageSize=${pageSize}`
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
    onError: (error: ResponseError) => {
      setContent(`ERROR: ${error.message}`, [
        {
          name: '확인',
          handler: () => {
            navigate('/404', { state: error.message });
            closeModal();
          },
        },
      ]);
    },
    onSuccess: (data) => {
      const newPage = data.pages.at(-1);
      if (newPage) {
        setResponsePage({
          ...responsePage,
          newPage: newPage.responsePage,
          allResponseList: [...responsePage.allResponseList, ...newPage.responsePage],
        });
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries(['characters', queryStringFilter]);
    setResponsePage({ allResponseList: [], newPage: [] });
  }, [queryStringFilter]);

  return { isLoading, renderPage, fetchNextPage, hasNextPage };
}

export default function usePaginator(url: string, pageSize: number) {
  const observer = useRef<IntersectionObserver>();
  const { isLoading, renderPage, fetchNextPage, hasNextPage } = useFetchPage(url, pageSize);

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

  return { isLoading, renderPage, observeElementRef };
}
