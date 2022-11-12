const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const key = process.env.PINATA_API_KEY;
const secret = process.env.PINATA_API_SECRET;
const JWT = process.env.PINATA_JWT;

async function storeImage(imagesFilePath) {
  const fullpath = path.resolve(imagesFilePath);

  try {
    var data = new FormData();
    data.append("file", fs.createReadStream(fullpath));
    data.append("pinataOptions", '{"cidVersion": 1}');
    data.append(
      "pinataMetadata",
      '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
    );

    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      headers: {
        Authorization: `Bearer ${JWT}`,
        ...data.getHeaders(),
      },
      data: data,
    };

    const res = await axios(config);
    console.log(res.data);

    return res.data.IpfsHash;
  } catch {}
}

module.exports = {
  storeImage,
};
