import React from 'react';
import Title from '../components/Title';
import Filter from '../components/Filter';
import CharactersList from '../components/CharactersList';

export default function CharactersPage() {
  return (
    <div>
      <Title />
      <Filter />
      <CharactersList />
    </div>
  );
}
