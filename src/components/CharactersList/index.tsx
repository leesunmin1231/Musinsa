import React from 'react';
import styled from '@emotion/styled';
import { bodyFont } from '../../styles/mixin';
import Character from './Character';
import Loading from '../Loading';
import usePaginator from '../../hooks/usePaginator';
import type { CharacterType } from '../../types/CharacterType';

export default function CharactersList() {
  const { isLoading, renderPage, observeElementRef } = usePaginator(`/characters`, {
    pageSize: 10,
  });
  console.log(renderPage.length);
  return (
    <Wrapper>
      {renderPage.map((character: CharacterType) => (
        <Character key={JSON.stringify(character)} detail={character} />
      ))}
      {isLoading ? <Loading /> : <Observer ref={observeElementRef} />}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  margin-bottom: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${bodyFont};
`;

const Observer = styled.div`
  width: 100%;
  height: 10px;
`;
