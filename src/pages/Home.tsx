import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import "./styles.scss";
import MessageThreads from "../components/chat/Chat";
import Header from "../components/header/Header";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="container">
        <Sidebar />
        <MessageThreads />
      </div>
    </div>
  );
};

export default Home;
