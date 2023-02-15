import React from 'react';
import styled from '@emotion/styled';
import { titleFont } from '../../styles/mixin';

export default function Title() {
  return <Wrapper>무신사 과제</Wrapper>;
}

const Wrapper = styled.header`
  width: 100%;
  height: 84px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY2};
  line-height: 84px;
  text-align: center;
  ${titleFont};
`;
