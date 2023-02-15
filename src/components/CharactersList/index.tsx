import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { bodyFont } from '../../styles/mixin';
import { httpGet } from '../../util/http';
import Character from './Character';
import { getListKey } from '../../util/getListKey';
import type { RequestError } from '../../types/Error';
import type { CharacterType } from '../../types/CharacterType';
import Loading from '../Loading';

export default function CharactersList() {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const { isLoading } = useQuery(['characters'], () => httpGet('/characters'), {
    refetchOnWindowFocus: true,
    staleTime: 60 * 60 * 1000,
    onError: (error: RequestError) => alert(error),
    onSuccess: (data) => setCharacters(data),
  });
  return (
    <Wrapper>
      {isLoading ? <Loading /> : characters.map((character) => <Character key={getListKey()} detail={character} />)}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${bodyFont};
`;
