import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { loadState } from "../redux/toDoSlise";
import { ReduxState } from "../redux/types";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

function App() {
  const state = useSelector((state: ReduxState) => state.toDo);
  const dispatch = useDispatch();

  const localStorageKey = "todoListState";

  // Загрузка данных из локального хранилища в стейт
  useEffect(() => {
    const savedState = localStorage.getItem(localStorageKey);

    if (savedState) {
      try {
        dispatch(loadState(JSON.parse(savedState)));
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Загрузка данных из стейта в локальное хранилище
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return (
    <AppContainer>
      <Header />
      <Main />
      <Footer />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.View`
  width: 100%;
  max-width: 500px;
  min-width: 280px;
  margin: 0 auto;
`;
