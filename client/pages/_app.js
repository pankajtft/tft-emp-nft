import "../styles/globals.css";
import React, { useEffect } from "react";
import MainFooter from "./Components/Mainfooter";
import TopNavBar from "./Components/TopNavBar";
import Login from "./Login";
import { AuthProvider } from "./Context/auth-context";
import ThemeProviderWrapper from "./utils/theme/ThemeProvider";

export default function App({ Component, pageProps }) {
  const [isUserAuthenticated, setIsAuthenticated] = React.useState(false);
  async function getToken() {
    if (typeof window !== (null || undefined)) {
      const token = localStorage.getItem("Token");
      if (token) setIsAuthenticated(true);
      return token;
    }
  }
  useEffect(() => {
    getToken();
  }, [isUserAuthenticated]);

  function Stack() {
    return !isUserAuthenticated ? (
      <Login />
    ) : (
      <>
        <TopNavBar />
        <Component {...pageProps} />
        <MainFooter />
      </>
    );
  }
  return (
      <AuthProvider>
        <ThemeProviderWrapper>
      <div className="flex flex-col h-screen justify-between">
        <Stack />
        </div>
        </ThemeProviderWrapper>
      </AuthProvider>
  );
}
