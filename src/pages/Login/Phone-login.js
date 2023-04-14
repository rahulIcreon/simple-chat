import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import React from "react";
import { auth } from "../../_firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactCodeInput from "react-code-input";
import { useNavigate } from "react-router-dom";

const PhoneLogin = React.memo(() => {
     const PIN_LENGTH = 6;
     const navigate = useNavigate();
  const [inputPhoneNumber, setInputPhoneNumber] = React.useState();
  const [confirmationToken,setConfirmationToken] = React.useState();
  const [pin, setPin] = React.useState();
  const pinRef = React.useRef()

  const setupRecaptcha =(number)=>{
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth, number,recaptchaVerifier )
  }
  
  const onSendPin = async (e) => {
    console.log(inputPhoneNumber);
    if(!inputPhoneNumber){
      toast.error("Please enter phone number")
      return;
    }
    try {
      const response = await setupRecaptcha(inputPhoneNumber)
      setConfirmationToken(response)
    } catch (error) {      
    }
  };

  const onSubmit =async(e)=>{
    e.preventDefault();
    try {
      await confirmationToken.confirm(pin)
      navigate("/")
    } catch (error) {
      toast.error("Wrong OTP")
    }
    
  }

  return (
    <form onSubmit={onSubmit}>
      <PhoneInput
        placeholder="Enter phone number"
        value={inputPhoneNumber}
        onChange={setInputPhoneNumber}
        defaultCountry="IN"
        countryCallingCodeEditable={false}
        international
      />
    <div id="recaptcha-container" />
      <button type="button" onClick={onSendPin}>Send OTP</button>
      <div className="loginPin">
                            <ReactCodeInput ref={pinRef} name="pin" type="text" fields={PIN_LENGTH} inputMode="numeric" autoFocus={true} onChange={setPin} />
                        </div>
      <button type="submit">Submit</button>
      <ToastContainer />
    </form>
  );
});

export default PhoneLogin;
