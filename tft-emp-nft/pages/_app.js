import "../styles/globals.css";
import MainFooter from "./Components/Mainfooter";
import TopNavBar from "./Components/TopNavBar";
import Login from "./Components/Login";

export default function App({ Component, pageProps }) {
  function isTokenAvailable() {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      let data = JSON.parse(localStorage.getItem("LoginData"));
      console.log(data?.user?.photoURL);
      if (!!!data?.token) return true;
      else return false;
    }
  }
  return isTokenAvailable() ? (
    <Login />
  ) : (
    <>
      <TopNavBar />
      <Component {...pageProps} />
      <MainFooter />
    </>
  );
}
