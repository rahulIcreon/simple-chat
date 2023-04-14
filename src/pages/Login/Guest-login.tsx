import React from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../_firebase/firebase";

const GuestLogin = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInAnonymously(auth)
      .then(() => {
        console.log("anonymous signed in successfully");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <button>Login as Guest</button>
    </form>
  );
};

export default GuestLogin;
