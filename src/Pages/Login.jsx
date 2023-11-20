import React, { useState } from 'react';
import SplashScreen from '../Components/SplashScreen';
import logo from '../assets/logo.jpg';
import emailImg from '../assets/email_black_24dp (1) 1 (1).svg';
import passwordimg from '../assets/fluent_book-number-20-regular.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setLoading(true);

    const data = {
      email,
      password,
      rememberMe,
    };

    axios
      .post(
        'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/adminLogin',
        data
      )
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          console.log(response);
          localStorage.setItem('service_providerId', response.data.response.id);
          navigate('/verify-email', { state: { email } });
        } else {
          const errorMessage = response.data.message || 'Login failed.';
          toast.error(errorMessage);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        toast.error(error.response.data.message || 'Login failed.');
        setLoading(false);
      });
  };

  const isButtonDisabled = !email || !password || loading;

  return (
    <SplashScreen>
      <div className="w-[534px] h-[524px] flex flex-col gap-2 ">
        <div className="w-[337px] h-[133px] ml-3 ">
          <img className="w-[100%] h-[100%]" src={logo} alt="" />
        </div>
        <div className="w-[80%] mx-auto flex flex-col justify-around h-[80%] -mt-2">
          <div>
            <p className="text-neutral-600 text-[32px] font-bold ">Login</p>
            <p className="text-neutral-600 text-base font-normal">
              Enter your details to log in to your account
            </p>
          </div>

          <div className="relative">
            <input
              type="email"
              className="w-full h-[60px] px-12 placeholder:text-stone-300 bg-white rounded-[10px] border border-neutral-200 relative"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <img
              src={emailImg}
              alt=""
              className="absolute top-[0.85rem] left-3"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full h-[60px] px-12 placeholder:text-stone-300 bg-white rounded-[10px] border border-neutral-200 relative"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={passwordimg}
              alt=""
              className="absolute top-[0.85rem] left-3"
            />
            <button
              className="bg-transparent border-none absolute top-[0.95rem] right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEye className="h-7 w-7 text-[#BDBDBD]" />
              ) : (
                <AiFillEyeInvisible className="h-7 w-7 text-[#BDBDBD]" />
              )}
            </button>
          </div>
          <div className="flex gap-1 items-center justify-start ml-1">
            <input
              type="checkbox"
              className="h-5 w-5 accent-[#49B400]"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <p className="text-xs text-[#6b6969]">Remember me</p>
          </div>
          <div>
            <button
              onClick={handleLogin}
              className="w-full h-[55px] bg-[#49B400] rounded-[10px] text-center text-white text-base font-bold"
              disabled={isButtonDisabled}
            >
              {loading ? 'Loading...' : 'LOGIN'}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SplashScreen>
  );
};

export default Login;
