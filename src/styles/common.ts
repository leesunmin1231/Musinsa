import styled from '@emotion/styled';
import { buttonFont } from './mixin';

export const MiddleButton = styled.button`
  height: 30px;
  width: 60px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  cursor: pointer;
  ${buttonFont}
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY4};
  }
  &:active {
    filter: brightness(0.7);
  }
  @media only screen and (max-width: 280px) {
    height: 25px;
    width: 48px;
  }
`;
