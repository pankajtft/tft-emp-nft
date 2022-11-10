import { useContext } from "react";
import { Web3Context } from "../context/Web3";

const ConnectButton = () => {
  const { connect, hasMetamask, isConnected } = useContext(Web3Context);

  return (
    <button
      className="border-2 border-blue-800 bg-blue-200 rounded-lg p-2 font-black"
      onClick={connect}
    >
      {hasMetamask
        ? isConnected
          ? "Connected! "
          : "Connect"
        : "Please install metamask"}
    </button>
  );
};

export default ConnectButton;
