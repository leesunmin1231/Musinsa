import React from 'react';
import styled from '@emotion/styled';
import type { CharacterType } from '../../../types/CharacterType';

export default function Character({ detail }: { detail: CharacterType }) {
  const aliasesEllipsis =
    detail.aliases.length > 2 ? `${detail.aliases.slice(0, 2).join(', ')} ...` : detail.aliases.join(', ');
  return (
    <Wrapper>
      <Info>
        <InfoLine>
          <span>name: {detail.name}</span>
          <span>aliases: {aliasesEllipsis}</span>
        </InfoLine>
        <InfoLine>title: {detail.title}</InfoLine>
        <InfoLine>
          <span>books: {detail.books.length}</span>
          <span>tvSeries: {detail.tvSeries.filter((tv) => tv !== '').length}</span>
        </InfoLine>
      </Info>
      <Delete>
        <DeleteButton>삭제</DeleteButton>
      </Delete>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 84px;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.GRAY2};
  margin-bottom: 15px;
`;

const Info = styled.div`
  width: 76%;
  display: flex;
  flex-direction: column;
`;

const Delete = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DeleteButton = styled.button`
  height: 30px;
  width: 60px;
  border-radius: 20px;
`;

const InfoLine = styled.div`
  width: 100%;
  line-height: 20px;
  span {
    margin-right: 10px;
  }
`;
