import React from "react";
import Register from "./pages/register/Register";
import Login from "./pages/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PAGES_TYPES } from "./Global/Routes";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./providers/auth";

function App() {
  const authentication = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {authentication.getToken() ? (
            <>
              <Route path="/*" element={<Navigate replace to={"/"} />} />
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <>
              <Route
                path="/*"
                element={<Navigate replace to={`/${PAGES_TYPES.LOG_IN}`} />}
              />
              <Route path={`/${PAGES_TYPES.LOG_IN}`} element={<Login />} />
              <Route path={`/${PAGES_TYPES.SIGN_UP}`} element={<Register />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
