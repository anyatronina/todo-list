import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router history={history}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>
);
