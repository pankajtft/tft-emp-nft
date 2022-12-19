import { React, useEffect } from 'react';
import { signin } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";



const Login = () => {
    return (
      <div className="grid h-screen place-items-center bg-my_bg_image">
        <div className="m-auto">
          <div className="flex justify-around items-center ml-10 gap-x-2">
            <>
              <div className="flex flex-row items-start justify-center w-1/2 py-18 px-28">
                <h1 className="font-extrabold text-6xl 
              bg-gradient-to-r bg-clip-text  text-transparent 
              from-indigo-500 via-purple-500 to-indigo-500
              animate-text
              ">Login to the Employee NFT's Zone!
                </h1>
              </div>
              </>
          </div>
          <div  className="flex justify-center items-center mt-6 ">
           <button className="login__btn login__google" onClick={signin}>
            Login with Google
          </button>
          </div>
          
        </div>
  
      </div>
      
    );
  };
  
  export default Login;