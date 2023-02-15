import React from 'react';
import styled from '@emotion/styled';

export default function Loading() {
  return (
    <Spinner>
      <Ldio>
        <div />
      </Ldio>
    </Spinner>
  );
}

const Spinner = styled.div`
  width: 98px;
  height: 98px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
`;

const Ldio = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.98);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
  @keyframes ldio-d5xbm7usfl {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  div {
    position: absolute;
    width: 48px;
    height: 48px;
    border: 6px solid ${({ theme }) => theme.colors.GRAY1};
    border-top-color: transparent;
    border-radius: 50%;
    animation: ldio-d5xbm7usfl 1s linear infinite;
    top: 50px;
    left: 50px;
  }
`;
