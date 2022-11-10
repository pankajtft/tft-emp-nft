import { Avatar, Card } from "antd";
const { Meta } = Card;

const NFTCard = () => {
  return (
    <Card
      style={{
        width: 300,
        border: "1px solid black",
        margin: "2rem",
        padding: "1rem",
        borderRadius: "1rem",
      }}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="10 ETH"
        description="This is the description"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-0 rounded-2xl w-full">
        Buy Now
      </button>
    </Card>
  );
};

export default NFTCard;
