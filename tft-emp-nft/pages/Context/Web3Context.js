import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ethers } from "ethers";

const defaultValue= {}
const Web3Context = React.createContext(defaultValue);
const { Provider, Consumer } = Web3Context;

const chainIdToNetwork = {
    1: "Mainnet",
    5: "Goerli",
    31337: "Hardhat",
  };
  
const Web3Provider = ({ children }) => {
    
    const [isConnected, setIsConnected] = useState(false);
    const [hasMetamask, setHasMetamask] = useState(false);
    const [contractToken, setContractToken] = useState(undefined);
    const [signer, setSigner] = useState(undefined);
    const [chainId, setChainID] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [network, setNetwork] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [nonce, setNonce] = useState(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
          setHasMetamask(true);
          window.ethereum.on("chainChanged", (e) => {
            setChainID(parseInt(e));
          });
          window.ethereum.on("accountsChanged", function (accounts) {
            setAddress(accounts[0]);
          });
        }
      },[]);
      async function setValues() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        setSigner(provider.getSigner());
        setChainID(window.ethereum.networkVersion);
        setAddress(await signer.getAddress());
        setNetwork(chainIdToNetwork[chainId]);
        setIsConnected(true);
        localStorage.setItem("isWalletConnected", true);
      }
      
      async function connect() {
        if (typeof window.ethereum !== "undefined") {
          try {
            await ethereum.request({ method: "eth_requestAccounts" });
            await setValues();
          } catch (e) {
            console.log(e);
          }
        } else {
          setIsConnected(false);
        }
      }
    
      async function disconnect() {
        try {
          setProvider(undefined);
          setSigner(undefined);
          setChainID(undefined);
          setAddress(undefined);
          setNetwork(undefined);
          setIsConnected(undefined);
          setContract(undefined);
        } catch (e) {
          console.log(e);
        }
      }
    const addEmployee=()=>{
        console.log("addEmployee")
    };
    const editEmployeeDetails = () =>{
        console.log("Edit Employee")
    }
    const burnNft = () =>{
        console.log("burning NFT")
    }
    console.log(isConnected, "has")
    return(
        <Provider value={{
            connect,
            disconnect,
            isConnected,
            contractToken,
            chainId,
            contract, 
            address,
            network,
            provider,
            hasMetamask,
            nonce,
            isAuthenticated
        }}>
            {children}
        </Provider>
    )
}

export  {Web3Context, Web3Provider}