import React, { useState, useEffect } from "react";

const defaultValue = { NFTs: [] };
const NFTContext = React.createContext(defaultValue);

const { Provider, Consumer } = NFTContext;

const NFTProvider = ({ children }) => {
  const [NFTs, setNFTS] = useState([
    {
      title: "Boring Co",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      price: "20",
    },
    {
      title: "Mitic Bureies",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      price: "20",
    },
    {
      title: "Cluster Crank",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      price: "20",
    },
    {
      title: "GK Ape",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      price: "1",
    },
  ]);

  return <Provider value={{ NFTs }}>{children}</Provider>;
};

export { NFTProvider, NFTContext };
