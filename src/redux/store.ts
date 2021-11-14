import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import toDoReducer from "./toDoSlise";

const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
