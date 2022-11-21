import React, { useState, useEffect } from "react";

const defaultValue = { NFTs: [] };
const NFTContext = React.createContext(defaultValue);

const { Provider, Consumer } = NFTContext;

const NFTProvider = ({ children }) => {
  const [NFTs, setNFTS] = useState([
    { title: "GK Ape", desc: "Loren Ipsum", price: "2" },
  ]);

  useEffect(() => {
    const getValues = async () => {
      //make API call to backend and set NFTs
    };
    getValues();
  }, []);

  return <Provider value={{ NFTs }}>{children}</Provider>;
};

export { NFTProvider, NFTContext };
