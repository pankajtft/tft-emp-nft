import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { getEmployeeData, getAdminUsers } from "../utils/apis";
const defaultValue = {
  token: null,
  isUserAuthenticated: false,
};
const AuthContext = React.createContext(defaultValue);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({ token: "", photoUrl: "" });
  const [isUserAuthenticated, setUserAuthenticated] = React.useState(false);
  // const [employeeData, setEmployeeData] = React.useState([]);
  const [isUserAdmin, setUserAdmin] = React.useState(false);
  const router = useRouter();
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const adminUsers = await getAdminUsers();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const user = result.user;
        const domain = user?.email.split("@");
        if (domain?.[1] !== "tftus.com") {
          alert("You are not authorised to login");
        } else {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          console.log({ credential, token, user }, "Helo");
          return { token, adminUsers, user };
        }
      })
      .then((data) => {
        if (data) {
          const isAdmin = adminUsers.includes(data?.user?.email);
          const photoUrl = data?.user?.photoURL;
          localStorage.setItem("ImageUrl", photoUrl);
          const token = data?.token;
          var userData = JSON.stringify({ token, isAdmin });
          localStorage.setItem("Token", userData);
          setUserAuthInfo();
          isAdmin && setUserAdmin(true);
          setTimeout(() => {
            router.reload(window.location.pathname);
          }, 2000);
        } else {
          alert("Domain Specified is not valid");
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
    router.reload(window.location.pathname);
  };

  const setUserAuthInfo = async () => {
    const token = await localStorage.getItem("Token");
    const photoUrl = await localStorage.getItem("ImageUrl");
    setAuthState({
      token: token,
      photoUrl: photoUrl,
    });
    setUserAuthenticated(true);
  };
  const setUser = () => {
    const tokenRaw = localStorage.getItem("Token");
    const token = JSON.parse(tokenRaw);
    console.log(token, "token");
    console.log(tokenRaw, "tokenraw");
    setUserAdmin(token?.isAdmin);
  };
  // const getData = useCallback(async () => {
  //   const data = await getEmployeeData();
  //   if (data) {
  //     setEmployeeData(data);
  //   } else return null;
  // }, [employeeData]);

  useEffect(() => {
    // getData();
    setUser();
  }, [isUserAdmin]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        isUserAuthenticated,
        loginWithGoogle,
        logout,
        // getData,
        // employeeData,
        isUserAdmin,
        setUserAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
