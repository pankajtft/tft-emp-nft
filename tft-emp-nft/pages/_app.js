import "../styles/globals.css";
import MainFooter from "./Components/Mainfooter";
import TopNavBar from "./Components/TopNavBar";
import Login from "./Components/Login";
import { useCallback, useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  
  const [isToken , setToken] = useState(false)

  const isTokenAvailable = useCallback(()=>{
    if (typeof window !== "undefined") {
      // Perform localStorage action
      let data = JSON.parse(window.localStorage.getItem("LoginData"));
      console.log(data?.user?.photoURL);
      if (!!!data?.token){
        setToken(data?.token)
      };
    }
  },[isToken]) 
    
  return !isToken ? (
    <>
    <Login />
    </>
  ) : (
    <>
      <TopNavBar />
      <Component {...pageProps} />
      <MainFooter />
    </>
  );
}
