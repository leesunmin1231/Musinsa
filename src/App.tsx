import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import styled from '@emotion/styled';
import globalStyle from './styles/global';
import AppTheme from './styles/theme';
import CharactersPage from './pages/CharactersPage';
import Error from './pages/Error';
import Modal from './components/Modal';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={AppTheme}>
          <Global styles={globalStyle} />
          <Frame>
            <Router>
              <Routes>
                <Route path="/404" element={<Error />} />
                <Route path="/" element={<CharactersPage />} />
              </Routes>
            </Router>
          </Frame>
          <Modal />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const Frame = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;

export default App;
