import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { highlightBodyFont } from '../styles/mixin';

export default function Error() {
  const { state } = useLocation();
  return (
    <Wrapper>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>{state.message}</ErrorMessage>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorCode = styled.div`
  font-size: 100px;
  color: ${({ theme }) => theme.colors.GRAY3};
  font-weight: 700;
  height: 150px;
`;
const ErrorMessage = styled.div`
  ${highlightBodyFont}
  color: ${({ theme }) => theme.colors.GRAY1};
`;
