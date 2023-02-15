import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { bodyFont } from '../../styles/mixin';
import { httpGet } from '../../util/http';
import Character from './Character';
import { getListKey } from '../../util/getListKey';
import type { RequestError } from '../../types/Error';
import type { CharacterType } from '../../types/CharacterType';

export default function CharactersList() {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const { isLoading } = useQuery(['products'], () => httpGet('/characters?gender=Male'), {
    refetchOnWindowFocus: true,
    staleTime: 60 * 60 * 1000,
    onError: (error: RequestError) => alert(error),
    onSuccess: (data) => setCharacters(data),
  });
  return (
    <Wrapper>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        characters.map((character) => <Character key={getListKey()} detail={character} />)
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  flex: 1;
  ${bodyFont};
`;
