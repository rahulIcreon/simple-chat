import { AttachFile } from "@mui/icons-material";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const Input = () => {
  return (
    <div className="input">
      <input type="text" name="" placeholder="Type your reply here" id="" />
      <div className="send">
        <input
          style={{ display: "none" }}
          type="file"
          name="images"
          id="imgUpload"
        />
        <label htmlFor="imgUpload">
          <AttachFile fontSize={"large"} />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
