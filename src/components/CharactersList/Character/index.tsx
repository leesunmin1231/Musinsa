import React from 'react';
import styled from '@emotion/styled';
import { MiddleButton } from '../../../styles/common';
import useModal from '../../../hooks/useModal';
import type { CharacterType } from '../../../types/CharacterType';

export default function Character({ detail }: { detail: CharacterType }) {
  const { setContent, closeModal } = useModal();
  const aliases = detail.aliases.join(', ');
  const nameLength = detail.name.length;
  const aliasesEllipsis =
    detail.name.length + aliases.length > 40 ? `${aliases.slice(0, 45 - nameLength)}...` : aliases;
  const deleteHandler = () => {
    setContent(`정말 삭제하시겠습니까?`, [
      { name: '확인', handler: closeModal },
      { name: '취소', handler: closeModal },
    ]);
  };
  return (
    <Wrapper>
      <Info>
        <InfoLine>
          <span>name: {detail.name.length === 0 ? 'No Name' : detail.name}</span>
          <span>aliases: {aliasesEllipsis}</span>
        </InfoLine>
        <InfoLine>title: {detail.title}</InfoLine>
        <InfoLine>
          <span>books: {detail.books.length}</span>
          <span>tvSeries: {detail.tvSeries.filter((tv) => tv !== '').length}</span>
        </InfoLine>
        <InfoLine>gender: {detail.gender}</InfoLine>
      </Info>
      <Delete>
        <MiddleButton onClick={deleteHandler}>삭제</MiddleButton>
      </Delete>
    </Wrapper>
  );
}

const Wrapper = styled.article`
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

const InfoLine = styled.div`
  width: 100%;
  line-height: 20px;
  span {
    margin-right: 10px;
    white-space: break-spaces;
  }
`;
