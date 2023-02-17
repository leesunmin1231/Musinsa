import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import globalStyle from './styles/global';
import AppTheme from './styles/theme';
import CharactersPage from './pages/CharactersPage';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={AppTheme}>
        <Global styles={globalStyle} />
        <CharactersPage />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
