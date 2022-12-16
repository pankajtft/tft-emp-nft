
const ConnectButton = () => {
 const isConnected = true
  return (
    <button
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium px-4 mx-2"
      onClick={console.log("connect")}
    >
      {isConnected
        ? isConnected
          ? "Not Connected"
          : "Connect Wallet"
        : "Please install metamask"}
    </button>
  );
};

export default ConnectButton;
