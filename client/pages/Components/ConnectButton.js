import { Web3Context } from "../Context/web3Context";
import React, { useEffect } from "react";
const ConnectButton = () => {
  const { connect, hasMetamask, isConnected } = React.useContext(Web3Context);
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await connect();
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, [isConnected]);
  return (
    <button
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium px-4 mx-2"
      onClick={connect}
    >
      {hasMetamask
        ? !isConnected
          ? "Not Connected"
          : "Wallet Connected"
        : "Please install metamask"}
    </button>
  );
};

export default ConnectButton;
