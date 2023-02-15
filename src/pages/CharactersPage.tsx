import React from 'react';
import styled from '@emotion/styled';
import Title from '../components/Title';
import Filter from '../components/Filter';
import CharactersList from '../components/CharactersList';

export default function CharactersPage() {
  return (
    <Wrapper>
      <Title />
      <Filter />
      <CharactersList />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
