import React from "react";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchBar/SearchBar";
import MessageThreadList from "../messageThreadList/MessageThreadList";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <SearchBar />
      <MessageThreadList />
    </div>
  );
};

export default Sidebar;
