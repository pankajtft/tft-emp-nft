import { useContext } from "react";
import { Web3Context } from "../context/Web3";

const ConnectButton = () => {
  const { connect, hasMetamask, isConnected } = useContext(Web3Context);

  return (
    <button
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      onClick={connect}
    >
      {hasMetamask
        ? isConnected
          ? "Connected"
          : "Connect Wallet"
        : "Please install metamask"}
    </button>
  );
};

export default ConnectButton;
