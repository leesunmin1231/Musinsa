import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { bodyFont } from '../../styles/mixin';
import Character from './Character';
import Loading from '../Loading';
import usePaginator from '../../hooks/usePaginator';
import { filters } from '../../atom';
import { getFilterQueryString } from '../../util/filterQueryString';
import type { CharacterType } from '../../types/CharacterType';

export default function CharactersList() {
  const filterList = useRecoilValue(filters);
  const { loading, error, page, observeElementRef } = usePaginator('/characters', {
    pageSize: 10,
    filter: getFilterQueryString(filterList),
  });
  if (error) {
    alert('데이터를 불러오는 데 실패하였습니다.');
  }
  const [renderList, setRenderList] = useState<CharacterType[]>(page);

  useEffect(() => {
    let render: CharacterType[] = [...page];
    if (filterList.noName.clicked) {
      render = page.filter((character: CharacterType) => character.name.length !== 0);
    }
    if (filterList.noTvSeries.clicked) {
      render = render.filter((character) => character.tvSeries.join('').length === 0);
    }
    setRenderList([...render]);
  }, [page, filterList]);
  return (
    <Wrapper>
      {renderList.map((character: CharacterType) => (
        <Character key={JSON.stringify(character)} detail={character} />
      ))}
      {loading ? <Loading /> : <Observer ref={observeElementRef} />}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${bodyFont};
`;

const Observer = styled.div`
  width: 100%;
  height: 30px;
`;
