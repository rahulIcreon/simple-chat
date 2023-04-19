import React from "react";
import MessageThreadMessage from "../messageThreadMessages/MessageThreadMessages";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Messages from "../messages/Messages";
import Input from "../input/Input";
const Chat = () => {
  return (
    <div className="messageThreadsContainer">
      <div className="chatInfo">
        <span>Tanveer</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
