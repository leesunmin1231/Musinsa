import { useState, useEffect } from 'react';
import { getRenderPageIndex } from '../util/getRenderPageIndex';
import type { RenderCharacterList, ResponseCharacterList, CharacterType, PaginationOption } from '../types/PageType';
import type { AllFiltersType } from '../types/FilterListType';

const initRenderPageData: RenderCharacterList = {
  prevPage: [],
  allRenderList: [],
};

export default function useClientFilter(
  option: PaginationOption,
  responsePage: ResponseCharacterList,
  filterList: AllFiltersType
) {
  const [renderPage, setRenderPage] = useState<RenderCharacterList>(initRenderPageData);

  const setNewRenderPage = (render: CharacterType[]) => {
    const pageIndex = getRenderPageIndex(render.length, option.pageSize, responsePage.newPage.length);
    setRenderPage({
      ...renderPage,
      allRenderList: render.slice(0, pageIndex.renderPageIndex),
      prevPage: render.slice(pageIndex.renderPageIndex, pageIndex.totalLength),
    });
  };

  /** api응답으로 받은 데이터가 변경되었을 때, 렌더링할 데이터 state 변경(tvSeries 필터링) */
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
  }, [responsePage]);

  /** tvSereies 클릭시 렌더링 목록 필터링
   * tvSereies 필터링 api가 없어서 데이터를 받아온 후 클라이언트에서 필터링 후 렌더링 상태에 반영
   */
  useEffect(() => {
    if (filterList.noTvSeries.clicked) {
      const render = responsePage.allResponseList.filter((character) => character.tvSeries.join('').length === 0);
      setNewRenderPage(render);
    }
  }, [filterList.noTvSeries.clicked]);

  /** 생존 인물, 성별 클릭시 렌더링 목록 초기화 */
  useEffect(() => {
    setRenderPage({ allRenderList: [], prevPage: [] });
  }, [filterList.female.clicked, filterList.isAlive.clicked]);

  return { renderPage: renderPage.allRenderList };
}
