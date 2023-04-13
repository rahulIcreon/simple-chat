import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import "./styles.scss";
import MessageThreads from "../components/messageThread/MessageThread";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <MessageThreads />
      </div>
    </div>
  );
};

export default Home;
