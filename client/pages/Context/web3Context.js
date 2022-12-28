import React, { useState, useEffect } from "react";
import { contractAddresses, abi } from "../contract-constants";
import { AuthContext } from "./auth-context";
import Web3 from "web3";
import { ethers } from "ethers";
import {
  updateEmployeeData,
  postEmployeeData,
  deleteData,
} from "../utils/apis";
const defaultValue = {};
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

  const { getData } = React.useContext(AuthContext);
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
  }, []);
  async function setValues() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    setSigner(provider.getSigner());
    setChainID(window.ethereum.networkVersion);
    setAddress(await signer.getAddress());
    setNetwork(chainIdToNetwork[chainId]);
    setIsConnected(true);
    localStorage.setItem("isWalletConnected", true);
    const address = contractAddresses["EMS"][chainId][0];

    const NFTMarketContract = new ethers.Contract(address, abi, signer);
    setContract(NFTMarketContract);
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
  const mintEmployeeNFT = async (d) => {
    try {
      console.log(d, "FromDa");
      let res = await contract.mintEmployeeNFT(
        d?.empDetail?.name,
        d?.empDetail?.empCode,
        d?.empDetail?.email,
        d?.empDetail?.skills?.[0].title,
        d?.projDetails?.[0].teamSize,
        d?.projDetails?.[0].projectName,
        d?.projDetails?.[0].projectStartDate,
        d?.projDetails?.[0].projectEndDate
      );
      res = await res.wait(1);
      if (res) {
        let tokenId = await contract.returnToken();
        // console.log(id, "token");
        // const finalData = {...d, }
        const _id = d._id;
        const formData = { _id, tokenId };
        await updateEmployeeData(formData);
        await getData();
      }
      console.log(res, "Employee Added");
    } catch (e) {
      console.log(e, "error mintEmployeeNFT");
    }
  };
  const updateEmployeeNFT = async (d) => {
    try {
      console.log(d, "D");
      let res = await contract.updateEmployeeNFT(
        d?.tokenId,
        "New Skills",
        Number(d?.projDetails?.[0].teamSize),
        d?.projDetails?.[0].projectName,
        100000,
        200000
      );
      console.log(res, "Employee data updated");
      if (res) {
        await updateEmployeeData(d);
        getData();
      }
    } catch (e) {
      console.log(e, "Error from updateEmployeeNFT");
    }
  };
  const burnNft = async (data) => {
    try {
      let res = await contract.burn(data?.tokenId);
      res = await res.wait(1);
      console.log(res);
      if (res) {
        await deleteData(data._id);
        getData();
      }
    } catch (e) {
      console.log(e, "error _burn");
    }
  };
  return (
    <Provider
      value={{
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
        isAuthenticated,
        mintEmployeeNFT,
        updateEmployeeNFT,
        burnNft,
      }}
    >
      {children}
    </Provider>
  );
};

export { Web3Context, Web3Provider };
