import { FormControlLabel } from "@mui/material";
import React from "react";
import SwitchButton from "../themeButton/Switch";
import { useTheme } from "../../providers/theme";
import { useSelector } from "react-redux";
import { StoreState } from "../../_redux/_Store";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../_firebase/firebase";

const Header = () => {
  const theme = useTheme();
  const loggedInUser = useSelector(
    (state: StoreState) => state.userAuth.loggedInUser
  );
  const [userName, setUserName] = React.useState<string>("");
  const navigate = useNavigate();
  const logoutHandler = () => {
    signOut(auth);
    navigate("/");
  };

  React.useEffect(() => {
    if (!loggedInUser) return;
    setUserName(
      loggedInUser.displayName
        ? loggedInUser?.displayName.replace(/^\w/, (c) => c.toUpperCase())
        : loggedInUser?.email
        ? loggedInUser?.email
            ?.split("@")[0]
            .replace(/^\w/, (c) => c.toUpperCase())
        : "Guest"
    );
  }, [loggedInUser]);
  console.log("userName", userName.charAt(0).toUpperCase() + userName.slice(1));
  return (
    <div className="header">
      <span className="logo">Simple Chat</span>
      <div className="themeSwitch">
        <span> Light</span>
        <FormControlLabel
          control={<SwitchButton sx={{ m: 1 }} defaultChecked />}
          label="Dark"
          onChange={theme.toggleTheme}
        />
      </div>
      <div className="navbar">
        <div className="user">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <span>{userName}</span>
        </div>
        <button onClick={logoutHandler}>Log out</button>
      </div>
    </div>
  );
};

export default Header;
