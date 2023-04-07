import React from "react";
import "./style.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link } from "react-router-dom";
import { PAGES_TYPES } from "../../Global/Routes";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Register</span>
        <form action="">
          <input type="text" placeholder="Display Name" />
          <input type="number" placeholder="Phone" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="fileUpload" />
          <label className="fileUpload" htmlFor="fileUpload">
            <AddPhotoAlternateIcon />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>
          You do have an account?{" "}
          <Link to={`/${PAGES_TYPES.LOG_IN}`}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
