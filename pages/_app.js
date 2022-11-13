import PrettyNavBar from "../components/PrettyNavBar";
import "../styles/globals.css";
import { Web3Provider } from "../context/Web3";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <PrettyNavBar />
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MyApp;
