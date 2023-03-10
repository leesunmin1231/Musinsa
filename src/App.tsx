import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
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
                <Route path="/" element={<CharactersPage />} />
                <Route path="/*" element={<Error />} />
              </Routes>
            </Router>
          </Frame>
          <Modal />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const Frame = styled.div`
  height: 100%;
  width: 100%;
  max-width: 800px;
  position: absolute;
`;

export default App;
