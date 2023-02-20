import { useState, useRef, useCallback, useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { filters } from '../atom';
import { httpGet } from '../util/http';
import { getFilterQueryString } from '../util/filterQueryString';
import useModal from './useModal';
import useClientFilter from './useClientFilter';
import type { ResponseCharacterList, PaginationOption, CharacterType } from '../types/PageType';
import type { ResponseError } from '../types/Error';

const initResponsePageData: ResponseCharacterList = { allResponseList: [], newPage: [] };

function useFetchPage(url: string, option: PaginationOption) {
  const navigate = useNavigate();
  const { setContent, closeModal } = useModal();
  const queryClient = useQueryClient();
  const filterList = useRecoilValue(filters);
  const [queryStringFilter, setQueryStringFilter] = useState(getFilterQueryString(filterList));
  const [startPage, setStartPage] = useState<number>(option.startPage);
  const [responsePage, setResponsePage] = useState<ResponseCharacterList>(initResponsePageData);
  const { renderPage } = useClientFilter(option, responsePage, filterList);

  const fetchPage = async ({ pageParam = startPage }) => {
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
      const allList: CharacterType[] = [];
      setResponsePage({
        ...responsePage,
        newPage: newPage.responseList,
        allResponseList: allList.concat(...pages.map((page) => page.responseList)),
      });
    }
  };

  const { fetchNextPage, isLoading, hasNextPage, isFetching } = useInfiniteQuery(
    ['characters', queryStringFilter],
    fetchPage,
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

  /** 필터 변경시 초기화 로직 */
  useEffect(() => {
    queryClient.invalidateQueries(['characters', queryStringFilter]);
    setStartPage(option.startPage);
    setResponsePage({ allResponseList: [], newPage: [] });
    setQueryStringFilter(getFilterQueryString(filterList));
  }, [filterList]);
  return { isLoading, renderPage, fetchNextPage, hasNextPage, isFetching };
}

export default function usePaginator(url: string, option: PaginationOption) {
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
