import React from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { bodyFont, badge } from '../../styles/mixin';
import { filters } from '../../atom';
import { FilterType } from '../../types/FilterListType';

export default function Filter() {
  const [filter, setFilter] = useRecoilState(filters);
  const clickHandler = (target: FilterType) => {
    setFilter({ ...filter, [target.key]: { ...target, clicked: !target.clicked } });
  };
  const initHandler = () => {
    setFilter({
      ...filter,
      isAlive: { ...filter.isAlive, clicked: false },
      female: { ...filter.female, clicked: false },
      noTvSeries: { ...filter.noTvSeries, clicked: false },
    });
  };
  return (
    <Wrapper>
      {Object.values(filter).map((button) =>
        button.clicked ? (
          <ClickedBadge onClick={() => clickHandler(button)} key={button.key}>
            {button.buttonName}
          </ClickedBadge>
        ) : (
          <UnClickedBadge onClick={() => clickHandler(button)} key={button.key}>
            {button.buttonName}
          </UnClickedBadge>
        )
      )}
      <UnClickedBadge onClick={initHandler}>초기화</UnClickedBadge>
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

const ClickedBadge = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  ${badge}
`;

const UnClickedBadge = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.GRAY2};
  color: ${({ theme }) => theme.colors.GRAY2};
  background-color: ${({ theme }) => theme.colors.WHITE};
  ${badge}
`;
