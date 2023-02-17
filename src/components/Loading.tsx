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
  width: 50px;
  height: 50px;
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
    width: 25px;
    height: 25px;
    border: 3px solid ${({ theme }) => theme.colors.GRAY1};
    border-top-color: transparent;
    border-radius: 50%;
    animation: ldio-d5xbm7usfl 1s linear infinite;
    top: 25px;
    left: 25px;
  }
`;
