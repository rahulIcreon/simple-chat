import React from "react";

const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
        <img
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYYTLgX6ZLrYwz-3c7iB3gVs87jIKnbbg3Ba-Gt8ykJF2uZgu4"
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
      </div>
    </div>
  );
};

export default Message;
