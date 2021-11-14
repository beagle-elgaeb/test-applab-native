import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import store from "./redux/store";

const Root = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

AppRegistry.registerComponent("App", () => Root);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root"),
});
