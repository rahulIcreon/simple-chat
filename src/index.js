import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { ThemeModeProvider } from "./context/ThemeMode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <ThemeModeProvider>
        <App />
        </ThemeModeProvider>
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
