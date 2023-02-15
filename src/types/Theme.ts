import '@emotion/react';

type styleColors = {
  WHITE: string;
  BLACK: string;
  GRAY1: string;
  GRAY2: string;
  GRAY3: string;
  GRAY4: string;
  GRAY5: string;
  RED: string;
  LIGHT_BLACK: string;
};

declare module '@emotion/react' {
  export interface Theme {
    colors: styleColors;
  }
}
