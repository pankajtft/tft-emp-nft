import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
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
    <Row gutter={16} style={{ display: "flex", flexDirection: "row" }}>
      <Col span={8}>
        <Card
          style={{
            width: 300,
            border: "2px solid black",
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
        </Card>
      </Col>
      <Col span={8}>
        <Card
          style={{
            width: 300,
            border: "2px solid black",
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
        </Card>
      </Col>
      <Col span={8}>
        <Card
          style={{
            width: 300,
            border: "2px solid black",
            borderRadius: "1rem",
            padding: "1rem",
            margin: "2rem",
          }}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="10 ETH"
            description="This is the description"
          />
        </Card>
      </Col>
    </Row>
  </div>
);
export default Form;
