import React, { useRef, useState } from "react";
import SplashScreen from "../Components/SplashScreen";
import logo from "../assets/logo.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const VerifyingEmail = () => {
  const location = useLocation();
  const { email } = location.state;
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (index, e) => {
    const value = e.target.value;
  
    // Handle backspace
    if (e.code === 'Backspace' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };
  
  const handleVerify = () => {
    setLoading(true);
    const enteredOtp = otp.join("");
    
    axios
      .post("https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/verifyOtp", {
        email: email,
        otp: enteredOtp,
      })
      .then((response) => {
        if (response.data.status === true && response.data.message === "OTP verified successfully") {
          // Assuming that a successful OTP verification returns these fields in response.data.adminDto
          const { FirstName, LastName, Email, Image } = response.data.adminDto;
  
          // You can use these fields as needed, for example:
          console.log("First Name:", FirstName);
          console.log("Last Name:", LastName);
          console.log("Email:", Email);
          console.log("Image:", Image);
  
          navigate("/home");
        } else {
          toast.error("Invalid OTP. Please check your OTP and try again.");
        }
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
        toast.error(error.response.data.message || "Verification failed.");
        setLoading(false);
      });
  };
  

  const handleResend = () => {
    const url = "https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/resendOtp";

    const payload = {
      email: email,
    };

    axios
      .post(url, payload)
      .then((response) => {
        console.log("Resend successful", response);
      })
      .catch((error) => {
        console.error("Error while resending", error);
      });
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.code === 'Backspace') {
      // Clear the current input with a slight delay
      setTimeout(() => {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }, 1);
  
      // Move focus to the previous input if not on the first input
      if (index > 0 && inputRefs[index - 1]) {
        setTimeout(() => {
          inputRefs[index - 1].current.focus();
        }, 1);
      }
    }
  };
  

  return (
    <SplashScreen>
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="h-[420px] w-[524px] flex flex-col items-start justify-evenly "
      >
        <div className=" w-[337px] h-[133px] ml-3 ">
          <img className="w-[100%] h-[100%]" src={logo} alt="" />
        </div>
        <div className="w-[80%] h-[80%]  mx-auto flex flex-col  justify-around    -mt-2">
          <div>
            <p className="text-neutral-600 text-[32px] font-bold ">
              Verifying Email
            </p>
            <p className="text-neutral-600 text-base font-normal">
              Please enter the OTP sent on your email
            </p>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {inputRefs.map((inputRef, index) => (
              <input
                className="h-[60px] bg-white rounded-[10px] border text-center border-[#E0E0E0]"
                key={index}
                ref={inputRef}
                type="text"
                maxLength={1}
                onInput={(e) => handleInput(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <div className="">
            <button
              onClick={handleVerify}
              className="w-full h-[60px] bg-[#49B400] rounded-[10px] text-center text-white text-base font-bold"
            >
              {loading ? "Loading..." : "Verify"}
            </button>
          </div>
          <ToastContainer />
          {error && <p className="text-red-500 text-base">{error}</p>}
          <div>
            <p className="text-[#4F4F4F] font-normal text-base">
              {" "}
              Didn't receive the email?{" "}
              <span
                className="text-[#4AB500] cursor-pointer"
                onClick={handleResend}
              >
                Click to resend
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </SplashScreen>
  );
};

export default VerifyingEmail;
