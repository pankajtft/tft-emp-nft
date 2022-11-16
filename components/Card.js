import { Avatar, Card } from "antd";
const { Meta } = Card;
import styles from "../styles/Card.module.css";

const NFTCard = () => {
  return (
    <Card
      className={styles.cardBody}
      hoverable
      style={{
        width: 250,
        // border: "1px solid black",
        margin: "2rem",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
      cover={
        <img
          className={styles.image}
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
          }}
          alt="example"
          src="https://joeschmoe.io/api/v1/random"
        />
      }
    >
      <Meta
      // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      // title="10 ETH"
      // description="This is the description"
      />
      <div className="additional">
        <p className="price">
          <span className={styles.price}>20 ETH</span>
        </p>
        <p>
          <span className={styles.quantity}>John Doe</span>
        </p>
      </div>
      <button className="buyNow bg-gray-800 hover:bg-gray-400 text-white font-bold my-1 py-.5 px-0 rounded-2xl w-6/12 ">
        Buy Now
      </button>
    </Card>
  );
};

export default NFTCard;
