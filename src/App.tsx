import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Global, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import globalStyle from './styles/global';
import AppTheme from './styles/theme';
import CharactersPage from './pages/CharactersPage';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={AppTheme}>
          <Global styles={globalStyle} />
          <CharactersPage />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
