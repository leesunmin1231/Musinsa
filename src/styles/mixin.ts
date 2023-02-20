import { css } from '@emotion/react';

export const titleFont = css`
  font-size: 26px;
  font-weight: 700;
`;

export const bodyFont = css`
  font-size: 16px;
  font-weight: 400;
  @media only screen and (max-width: 280px) {
    font-size: 14px;
  }
`;

export const buttonFont = css`
  font-size: 12px;
  font-weight: 400;
  @media only screen and (max-width: 280px) {
    font-size: 10px;
  }
`;

export const highlightBodyFont = css`
  font-size: 24px;
  font-weight: 500;
`;

export const badge = css`
  height: 30px;
  width: min-content;
  border-radius: 10px;
  white-space: pre;
  ${buttonFont}
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:active {
    filter: brightness(0.7);
  }
  @media (hover: hover) {
    &:hover {
      filter: brightness(0.9);
    }
  }
`;
