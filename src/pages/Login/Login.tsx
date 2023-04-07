import React from "react";
import "./style.scss";
import { Button } from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { PAGES_TYPES } from "../../Global/Routes";

enum LOGIN_TYPE {
  CHOOSE,
  EMAIL,
  PHONE,
  GUEST,
}

const Login = React.memo(() => {
  const [logInType, setLogInType] = React.useState<LOGIN_TYPE>(
    LOGIN_TYPE.CHOOSE
  );

  return (
    <>
      <div className="loginContainer">
        <div className="loginContainer__wrapper">
          {logInType !== LOGIN_TYPE.CHOOSE ? (
            <div className="backButton">
              <ArrowBackIcon onClick={() => setLogInType(LOGIN_TYPE.CHOOSE)} />
            </div>
          ) : (
            ""
          )}
          {logInType === LOGIN_TYPE.CHOOSE ? (
            <div className="loginWrapper">
              <div>
                <Button
                  startIcon={<Phone />}
                  variant="contained"
                  onClick={() => {
                    setLogInType(LOGIN_TYPE.PHONE);
                  }}
                >
                  Login with Phone Number
                </Button>
              </div>
              <Button
                startIcon={<Email />}
                variant="contained"
                onClick={() => {
                  setLogInType(LOGIN_TYPE.EMAIL);
                }}
              >
                Login with Email
              </Button>
              <Button
                variant="contained"
                startIcon={<NoAccountsIcon />}
                onClick={() => setLogInType(LOGIN_TYPE.GUEST)}
              >
                Login as Guest
              </Button>
            </div>
          ) : logInType === LOGIN_TYPE.EMAIL ? (
            <form action="">
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Submit</button>
            </form>
          ) : logInType === LOGIN_TYPE.PHONE ? (
            <form action="">
              <input type="number" placeholder="Phone" />
              <input type="password" placeholder="Password" />
              <button>Submit</button>
            </form>
          ) : (
            <form action="">
              <input type="text" placeholder="Display Name" />
              <button>Submit</button>
            </form>
          )}
        </div>
        <p>
          Don't have an account?{" "}
          <Link to={`/${PAGES_TYPES.SIGN_UP}`}>Register</Link>
        </p>
      </div>
    </>
  );
});

export default Login;
