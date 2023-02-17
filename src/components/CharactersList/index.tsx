import React from 'react';
import styled from '@emotion/styled';
import { bodyFont } from '../../styles/mixin';
import Character from './Character';
import Loading from '../Loading';
import usePaginator from '../../hooks/usePaginator';
import type { CharacterType } from '../../types/CharacterType';

export default function CharactersList() {
  const { loading, error, page, observeElementRef } = usePaginator('/characters', 10);
  if (error) {
    alert('데이터를 불러오는 데 실패하였습니다.');
  }
  return (
    <Wrapper>
      {page.map((character: CharacterType) => (
        <Character key={JSON.stringify(character)} detail={character} />
      ))}
      {loading ? <Loading /> : <div ref={observeElementRef} />}
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
