import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth, createUserDocument } from "../../_firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { USER_ACTION_TYPE } from "../../_redux/UserAuthReducer";
interface FormData {
  email: string;
  password: string;
}
const EmailLogin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });
  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value } as FormData);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;
    if (email === "" || password === "") {
      toast.error("Please enter valid Email & Password");
      return;
    }
    try {
      const authFirebaseUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      createUserDocument(authFirebaseUser.user);
      dispatch({
        type: USER_ACTION_TYPE.SET_LOGGEDIN_USER,
        payload: authFirebaseUser.user,
      });
      console.log("authFirebaseUser", authFirebaseUser);
    } catch (error) {
      toast.error("Firebase Authentication failed");
      console.log("Firebase Authentication failed", error);
    }

    console.log("formData", formData);
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        value={formData?.email}
        onChange={onChangeHandle}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData?.password}
        onChange={onChangeHandle}
        placeholder="Password"
      />
      <button type="submit">Submit</button>
      <ToastContainer />
    </form>
  );
};

export default EmailLogin;
