import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodoMain } from "./pages/List/TodoMain";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { TodoInfo } from "./pages/Info/TodoInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #97b4ff;    
  }
  ${reset};
  &::-webkit-scrollbar {display:none;}
`;

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoMain />}></Route>
            <Route path="/info/:id" element={<TodoInfo />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
