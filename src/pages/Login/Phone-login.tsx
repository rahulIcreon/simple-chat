import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import React from "react";
import { auth } from "../../_firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactCodeInput from "react-code-input";
import { useNavigate } from "react-router-dom";

enum LOGIN_STATE {
  SEND_OTP = "SEND_OTP",
  VERIFY_OTP = "VERIFY_OTP",
}

const PhoneLogin = React.memo(() => {
  const PIN_LENGTH = 6;
  const navigate = useNavigate();
  const [inputPhoneNumber, setInputPhoneNumber] = React.useState();
  const [confirmationToken, setConfirmationToken] =
    React.useState<ConfirmationResult>();
  const [pin, setPin] = React.useState<string>();
  const [loginState, setLoginState] = React.useState<LOGIN_STATE>(
    LOGIN_STATE.SEND_OTP
  );
  const pinRef = React.useRef() as React.MutableRefObject<ReactCodeInput>;

  const setupRecaptcha = (number: string) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    const response = signInWithPhoneNumber(auth, number, recaptchaVerifier);
    return response;
  };

  const onSendPin = async () => {
    setLoginState(LOGIN_STATE.VERIFY_OTP);
    if (!inputPhoneNumber) {
      toast.error("Please enter phone number");
      setLoginState(LOGIN_STATE.SEND_OTP);
      return;
    }
    try {
      const response = await setupRecaptcha(inputPhoneNumber);
      setConfirmationToken(response);
    } catch (error) {
      toast.error("Wrong OTP");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!confirmationToken || !pin) return;
      await confirmationToken.confirm(pin);
      navigate("/");
    } catch (error) {
      toast.error("Wrong OTP");
    }
  };
  const onPhoneInputChange = (value: any) => {
    setInputPhoneNumber(value);
  };

  const onPinChange = (pin: string) => {
    console.log("PIN", pin);
    setPin(pin);
  };
  return (
    <form onSubmit={onSubmit}>
      <PhoneInput
        placeholder="Enter phone number"
        value={inputPhoneNumber}
        onChange={onPhoneInputChange}
        defaultCountry="IN"
        countryCallingCodeEditable={false}
        international
      />
      <div id="recaptcha-container" />
      {loginState === LOGIN_STATE.SEND_OTP ? (
        <button type="button" onClick={onSendPin}>
          Send OTP
        </button>
      ) : (
        ""
      )}
      {loginState === LOGIN_STATE.VERIFY_OTP ? (
        <>
          <div className="loginPin">
            <ReactCodeInput
              ref={pinRef}
              name="pin"
              type="text"
              fields={PIN_LENGTH}
              inputMode="numeric"
              autoFocus={true}
              value={pin}
              onChange={onPinChange}
            />
          </div>
          <button type="submit">Submit</button>
        </>
      ) : (
        ""
      )}
      <ToastContainer />
    </form>
  );
});

export default PhoneLogin;
