import { Col, Row } from "antd";
import { useState, useEffect, useContext } from "react";
import { NFTContext } from "../context/NFTs";
import Card from "./PrettyCard";

const MarketPlace = () => {
  const { NFTs } = useContext(NFTContext);

  useEffect(() => {
    //make API call to backend and set NFTS
  });

  return (
    <>
      <div
        style={{
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <Row
          gutter={16}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {NFTs?.length > 0 ? (
            NFTs.map((nft, index) => <Card key={index} nft={nft} />)
          ) : (
            <> No NFTS On Sale... Try Later! </>
          )}
        </Row>
      </div>
    </>
  );
};
export default MarketPlace;
