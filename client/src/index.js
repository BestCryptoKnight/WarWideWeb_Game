import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import store from "./store";
import "@fontsource/roboto";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
