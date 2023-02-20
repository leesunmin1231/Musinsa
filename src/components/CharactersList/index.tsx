import React from 'react';
import queryString from 'query-string';
import styled from '@emotion/styled';
import { bodyFont } from '../../styles/mixin';
import Character from './Character';
import Loading from '../Loading';
import usePaginator from '../../hooks/usePaginator';
import type { CharacterType } from '../../types/CharacterType';

const getStartPage = () => {
  const pageQuery = queryString.parse(window.location.search);
  const start = pageQuery?.page;
  if (start !== undefined) return Number(start);
  return 1;
};

export default function CharactersList() {
  const { isFetching, renderPage, observeElementRef } = usePaginator(`/characters`, {
    startPage: getStartPage(),
    pageSize: 10,
  });
  return (
    <Wrapper>
      {renderPage.map((character: CharacterType) => (
        <Character key={character.url} detail={character} />
      ))}
      {isFetching ? <Loading /> : <Observer ref={observeElementRef} />}
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
  height: 80px;
`;
