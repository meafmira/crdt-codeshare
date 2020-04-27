import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createLoguxCreator } from "@logux/redux";
import { badge, badgeEn, log } from "@logux/client";
import { badgeStyles } from "@logux/client/badge/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { nanoid } from "nanoid";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { reducer } from "./reducers";

const createStore = createLoguxCreator({
  subprotocol: "1.0.0",
  server:
    process.env.NODE_ENV === "development"
      ? "ws://localhost:31337"
      : "wss://logux.example.com",
  userId: "default", // TODO: We will fill it in next chapter
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

badge(store.client, { messages: badgeEn, styles: badgeStyles });
log(store.client);

console.log("Start client");
store.client.start();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <Switch>
          <Route path="/:sessionId">
            <App />
          </Route>
          <Redirect from="/" to={`/${nanoid()}`} />
        </Switch>
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
