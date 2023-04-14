import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import "./styles.scss";
import MessageThreads from "../components/messageThread/MessageThread";
import { FormControlLabel } from "@mui/material";
import SwitchButton from "../components/themeButton/Switch";
import { useTheme } from "../providers/theme";

const Home = () => {
  const theme = useTheme();

  return (
    <div className="home">
      <div className="header">
        <FormControlLabel
          control={<SwitchButton sx={{ m: 1 }} defaultChecked />}
          label="MUI switch"
          onChange={theme.toggleTheme}
        />
      </div>
      <div className="container">
        <Sidebar />
        <MessageThreads />
      </div>
    </div>
  );
};

export default Home;
