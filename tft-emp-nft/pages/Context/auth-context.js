import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase-config";

const defaultValue= {
    token:null,
    isUserAuthenticated:false
}
const AuthContext = React.createContext(defaultValue);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({ token:""});
  const [isUserAuthenticated, setUserAuthenticated] = React.useState(false)

  const router = useRouter()
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const user = result.user;
        const domain = user?.email.split("@"); 
        if(domain?.[1] !== "tftus.com"){
          alert("You are not authorised to login")
        }
        else {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log({ credential, token, user });
        return token
        }
       
      }).then((data)=>{
        if(data){
          localStorage.setItem("Token", data);
          setUserAuthInfo()
          router.reload(window.location.pathname)
        }
        else {
          alert("Domain Specified is not valid")
        }
        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  const logout = async () => {
    await auth.signOut();
    localStorage.removeItem("Token");
    console.log("Token revoked .Logout successfull");
    router.reload(window.location.pathname)
  };

  const setUserAuthInfo = ( data ) => {
    const token = localStorage.getItem("Token");
    setAuthState({
      token
    });
    setUserAuthenticated(true)
  };
  const setUser =() =>{

      const token = localStorage.getItem("Token")
      setUserAuthInfo(token)
  }
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
