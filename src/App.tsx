import React from "react";
import Register from "./pages/register/Register";
import Login from "./pages/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PAGES_TYPES } from "./Global/Routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={`/${PAGES_TYPES.LOG_IN}`} />}
          />
          <Route path={`/${PAGES_TYPES.LOG_IN}`} element={<Login />} />
          <Route path={`/${PAGES_TYPES.SIGN_UP}`} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
