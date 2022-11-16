import { Form, Input, Upload, Switch } from "antd";
import "antd/dist/antd.css";
import { storeImage } from "../utils/upload";

const Create = () => {
  const { TextArea } = Input;

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(document.querySelector("input[type=file]"));
    storeImage();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div style={{ margin: "4rem" }}>
        <h1>Do you have meta data already?</h1>
        <Switch defaultChecked />
      </div>

      <Form
        style={{
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
        }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input placeholder="My Nice NFT" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="Description"
          rules={[
            {
              required: true,
              message: "Please input some description!",
            },
          ]}
        >
          <TextArea
            rows={4}
            maxLength={100}
            placeholder="Some NFT Description"
          />
        </Form.Item>

        <Form.Item label="Upload">
        <input type="file" />
          </Form.Item>

        {/* <Form.Item label="Upload">
          <Form.Item name="dragger" valuePropName="fileList" noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item> */}

        <Form.Item
          label="Attack"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="Attack"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
            }}
          >
            <Input placeholder="Enter Value" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Speed"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="Speed"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
            }}
          >
            <Input placeholder="Enter Value" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Health"
          style={{
            marginBottom: "2rem",
          }}
        >
          <Form.Item
            name="Health"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
            }}
          >
            <Input placeholder="Enter Value" />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <button
            className="border-2 border-blue-800 bg-blue-200 rounded-lg p-2 font-black absolute bottom-0 right-20 h-16 w-1/5"
            onClick={onFinish}
          >
            {" "}
            List{" "}
          </button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Create;
