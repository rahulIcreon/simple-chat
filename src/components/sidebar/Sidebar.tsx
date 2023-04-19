import React from "react";
import Navbar from "../navbar/Navbar";
import Chats from "../chats/Chats";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      {/* <SearchBar /> */}
      <Chats />
    </div>
  );
};

export default Sidebar;
