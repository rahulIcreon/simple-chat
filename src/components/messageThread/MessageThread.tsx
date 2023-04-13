import React from "react";
import MessageThreadMessage from "../messageThreadMessages/MessageThreadMessages";

const MessageThreads = () => {
  return (
    <div className="messageThreadsContainer">
      <div className="chatInfo">
        <span>User Name</span>
        <MessageThreadMessage />
      </div>
    </div>
  );
};

export default MessageThreads;
