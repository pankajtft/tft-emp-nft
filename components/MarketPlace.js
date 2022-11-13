import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import Card from "./Card";

const MarketPlace = () => {
  const [NFTs, setNFTS] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

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
          {NFTs.length > 0 ? (
            NFTs.map((i, nft) => <Card key={i} nft={nft} />)
          ) : (
            <> No NFTS On Sale... Try Later! </>
          )}
        </Row>
      </div>
    </>
  );
};
export default MarketPlace;
