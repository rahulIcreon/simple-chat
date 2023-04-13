import React from "react";
import "./style.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link, useNavigate } from "react-router-dom";
import { PAGES_TYPES } from "../../Global/Routes";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserDocument, storage } from "../../_firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../../providers/auth";
import { CircularProgress } from "@mui/material";

interface FormData {
  displayName: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
}

const Register = () => {
  const authentication = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    displayName: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
  });

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value } as FormData);
  };
  const onAvatarChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files;
    if (!imageFile) return;
    const storageRef = ref(storage, "images/rivers.jpg");
    const uploadTask = uploadBytesResumable(storageRef, imageFile[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error("Avatar could not be uploaded. Please try again");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData?.email || !formData.password) return;
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formData?.email,
        formData?.password
      );

      setFormData({
        displayName: formData.displayName,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar,
        password: formData.password,
      });

      const completeInfo = {
        ...response.user,
        displayName: formData.displayName,
        photoURL: formData.avatar,
        phoneNumber: formData.phone,
      };
      createUserDocument(completeInfo);
      authentication.setToken(response.user.uid);
      toast.success(`New user ${formData.displayName} created!`);
      toast.success("Navigating to Home page, hold on!");
      setIsLoading(false);
    } catch (error) {
      toast.error("error while creating user with email & password:");
      setIsLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="displayName"
            onChange={onChangeHandle}
            placeholder="Display Name"
          />
          <input
            type="text"
            name="phone"
            onChange={onChangeHandle}
            placeholder="Phone"
          />
          <input
            type="email"
            name="email"
            onChange={onChangeHandle}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandle}
            placeholder="Password"
          />
          <input
            style={{ display: "none" }}
            type="file"
            name="avatar"
            onChange={onAvatarChangeHandle}
            id="fileUpload"
          />
          <label className="fileUpload" htmlFor="fileUpload">
            <AddPhotoAlternateIcon />
            <span>Add an avatar</span>
          </label>
          <button className={isLoading ? "loading" : "default"} type="submit">
            {isLoading ? (
              <CircularProgress size={16} color="success" />
            ) : (
              "Sign Up"
            )}{" "}
          </button>
        </form>
        <p>
          You do have an account?
          <Link to={`/${PAGES_TYPES.LOG_IN}`}>Login</Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
