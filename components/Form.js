import { Avatar, Card } from "antd";
import React from "react";
const { Meta } = Card;
import { Col, Row } from "antd";

const Form = () => (
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
      <Col span={8}>
        <Card
          style={{
            width: 300,
            border: "1px solid black",
            margin: "2rem",
            padding: "0rem",
            borderRadius: "1rem",
          }}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="10 ETH"
            description="This is the description"
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-0 rounded-2xl w-full">
            Buy Now
          </button>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          style={{
            width: 300,
            border: "1px solid black",
            margin: "2rem",
            padding: "0rem",
            borderRadius: "1rem",
          }}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="10 ETH"
            description="This is the description"
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-0 rounded-2xl w-full">
            Buy Now
          </button>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          style={{
            width: 300,
            border: "1px solid black",
            margin: "2rem",
            padding: "0rem",
            borderRadius: "1rem",
          }}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="10 ETH"
            description="This is the description"
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-0 rounded-2xl w-full">
            Buy Now
          </button>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          style={{
            width: 300,
            border: "1px solid black",
            margin: "2rem",
            padding: "0rem",
            borderRadius: "1rem",
          }}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="10 ETH"
            description="This is the description"
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-0 rounded-2xl w-full">
            Buy Now
          </button>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          style={{
            width: 300,
            border: "1px solid black",
            margin: "2rem",
            padding: "0rem",
            borderRadius: "1rem",
          }}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="10 ETH"
            description="This is the description"
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-0 rounded-2xl w-full">
            Buy Now
          </button>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          style={{
            width: 300,
            border: "1px solid black",
            margin: "2rem",
            padding: "0rem",
            borderRadius: "1rem",
          }}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="10 ETH"
            description="This is the description"
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-0 rounded-2xl w-full">
            Buy Now
          </button>
        </Card>
      </Col>
    </Row>
  </div>
);
export default Form;
