import React, { useState, useEffect } from "react";

import { ethers } from "ethers";
import { contractAddress, abi } from "../contract-constants";

const defaultValue = {};
const Web3Context = React.createContext(defaultValue);

const { Provider, Consumer } = Web3Context;

const Web3Provider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [chainId, setChainID] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
      window.ethereum.on("chainChanged", (e) => {
        setChainID(parseInt(e));
      });
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
        setChainID(window.ethereum.networkVersion);
        // const contract = new ethers.Contract(contractAddress, abi, signer);
        // setContract(contract);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  return (
    <Provider
      value={{
        isConnected,
        hasMetamask,
        signer,
        chainId,
        connect,
        contract,
      }}
    >
      {children}
    </Provider>
  );
};

export { Web3Provider, Web3Context };
