import React from "react";
import { Switch, Route } from "react-router-dom";

import styled from "styled-components";
import Cart from "./Cart/Cart";
import Contact from "./Contact";
import Confirmation from "./Confirmation";
import Item from "./Item";
import Main from "./Main";
import Store from "./Store/Store";
import ErrorPage from "./ErrorPage";
import Checkout from "./Checkout";
import About from "./About";

const Body = () => {
  return (
    <>
      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Wrapper>
        <Switch>
          <Route exact path="/store/category/:category">
            <Store />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/contactinfo">
            <Contact />
          </Route>
          <Route exact path="/confirmation">
            <Confirmation />
          </Route>
          <Route exact path="/error">
            <ErrorPage />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="/item/:id">
            <Item />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>          
        </Switch>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background: white;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
`;

export default Body;
