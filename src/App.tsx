import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";
import globalStyle from "./styles/global";
import CharactersPage from "./pages/CharactersPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Global styles={globalStyle} />
        <CharactersPage />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
