// const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const JWT = process.env.PINATA_JWT;

async function storeImage() {
  var doc = document.querySelector("input[type=file]");
  var file = doc.files;

  console.log(file);

  var data = new FormData();
  data.append("file", file);
  data.append("pinataOptions", '{"cidVersion": 1}');
  data.append(
    "pinataMetadata",
    '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
  );

  console.log(data);

  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    headers: {
      Authorization: `Bearer ${JWT}`,
      ...data.getHeaders(),
    },
    data: data,
  };

  let res = await axios(config);

  console.log("IMAGE IPFS HASH: ", res.data.IpfsHash);

  var tokenUriMetadata = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: "IpfsNFT",
    },
    pinataContent: {
      name: "IpfsNFT",
      keyvalues: {
        image: `ipfs://${res.data.IpfsHash}`,
      },
    },
  });

  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
    data: tokenUriMetadata,
  };

  res = await axios(config);

  console.log(tokenUriMetadata);

  return res.data.IpfsHash;
}

module.exports = {
  storeImage,
};
