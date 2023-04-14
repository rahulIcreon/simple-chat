import { signInWithPhoneNumber } from "firebase/auth";
import React from "react";
import { auth, firebaseApp, firebaseConfig } from "../../_firebase/firebase";
import { ToastContainer, toast } from "react-toastify";

const PhoneLogin = () => {
  const [inputPhoneNumber, setInputPhoneNumber] = React.useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputPhoneNumber) {
      toast.error("Please provide the phone number");
      return;
    }
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, inputPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log("confirmationResult", confirmationResult);
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        toast.error("SMS could not be sent!");
        console.log("SMS could not be sent!", error);
      });
  };

  const phoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputPhoneNumber(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={inputPhoneNumber}
        onChange={phoneHandler}
        placeholder="Phone"
      />
      <button>Submit</button>
      <ToastContainer />
    </form>
  );
};

export default PhoneLogin;
