import React from "react";
import { Router } from "react-router-dom";

import styled from "styled-components";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { createBrowserHistory } from 'history';

import GlobalStyles from "../GlobalStyles";

function App() {
  const historyInstance = createBrowserHistory();
 
  return (
    <Router history={historyInstance}>
      <Wrapper>
        <Header />
        <Body />
        <Footer />
      </Wrapper>
      <GlobalStyles />
    </Router>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
