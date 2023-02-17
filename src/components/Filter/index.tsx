import React from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { bodyFont, buttonFont } from '../../styles/mixin';
import { filters } from '../../atom';
import { FilterListType } from '../../types/FilterListType';

export default function Filter() {
  const [filterList, setFilterList] = useRecoilState(filters);
  const clickHandler = (target: FilterListType) => {
    setFilterList(
      filterList.map((button) => (button.key === target.key ? { ...button, clicked: !button.clicked } : { ...button }))
    );
  };
  return (
    <Wrapper>
      {filterList.map((button) =>
        button.clicked ? (
          <ClickedButton onClick={() => clickHandler(button)} key={button.key}>
            {button.buttonName}
          </ClickedButton>
        ) : (
          <UnClickedButton onClick={() => clickHandler(button)} key={button.key}>
            {button.buttonName}
          </UnClickedButton>
        )
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${bodyFont};
`;

const ClickedButton = styled.button`
  height: 30px;
  width: min-content;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  white-space: pre;
  ${buttonFont}
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY5};
  }
  &:active {
    filter: brightness(0.7);
  }
`;

const UnClickedButton = styled.button`
  height: 30px;
  width: min-content;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY2};
  color: ${({ theme }) => theme.colors.GRAY2};
  background-color: ${({ theme }) => theme.colors.WHITE};
  white-space: pre;
  ${buttonFont}
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY5};
  }
  &:active {
    filter: brightness(0.7);
  }
`;
