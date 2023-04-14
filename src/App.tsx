import React from "react";
import Register from "./pages/register/Register";
import Login from "./pages/Login/index";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PAGES_TYPES } from "./Global/Routes";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./providers/auth";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChangedListner } from "./_firebase/firebase";
import { USER_ACTION_TYPE } from "./_redux/UserAuthReducer";
import { StoreState } from "./_redux/_Store";

function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state: StoreState) => state.userAuth.loggedInUser
  );

  React.useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      dispatch({
        type: USER_ACTION_TYPE.SET_LOGGEDIN_USER,
        payload: user,
      });
    });
    return unsubscribe;
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {loggedInUser ? (
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
