import PrettyNavBar from "../components/PrettyNavBar";
import Footer from "../components/Prettyfooter";
import "../styles/globals.css";
import { Web3Provider } from "../context/Web3";
import { NFTProvider } from "../context/NFTs";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <NFTProvider>
        <PrettyNavBar />
        <Component {...pageProps} />
        <Footer/>
      </NFTProvider>
    </Web3Provider>
  );
}

export default MyApp;
