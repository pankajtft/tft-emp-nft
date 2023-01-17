require("dotenv").config();
const express = require("express");
const initMongo = require("./config/mongo");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { ethers } = require("ethers");
const address = require("../client/pages/contract-constants/addresses.json")
  .EMS[31337];
const abi = require("../client/pages/contract-constants/abi.json_EMS.json");

const { updateTokenId } = require("./controllers/employee/helpers");

const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_URL);

var signer = new ethers.Wallet(process.env.POLY_PRIVATE_KEY, provider);
const FactoryContractEthers = new ethers.Contract(address[0], abi, signer);
module.exports = { FactoryContractEthers };

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// Init all other stuff
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(require("./routes"));

// Setup express server port from ENV, default: 3000
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"));

initMongo();

FactoryContractEthers.on(
  "NFTMinted",
  (employeeName, email, skills, empId, tokenId, empHash) => {
    updateTokenId(empId, tokenId);
    console.log(
      "nft minted with details ",
      employeeName,
      email,
      skills,
      empId,
      tokenId,
      empHash
    );
  }
);

FactoryContractEthers.on(
  "projectAdded",
  (projectName, startTime, endTime, tokenId, team_size, uriHash) => {
    console.log(
      "project added with details ",
      projectName,
      startTime,
      endTime,
      tokenId,
      team_size,
      uriHash
    );
  }
);

FactoryContractEthers.on(
  "projectEdited",
  (projectName, startTime, endTime, tokenId, team_size, projectHash) => {
    console.log(
      "project edited with details ",
      projectName,
      startTime,
      endTime,
      tokenId,
      team_size,
      projectHash
    );
  }
);

FactoryContractEthers.on("skillUpdated", (tokenId, skills, uriHash) => {
  console.log("skill updated with details", tokenId, skills, uriHash);
});

FactoryContractEthers.on("burnNFT", (tokenId) => {
  console.log("Nft burned ", tokenId);
});

FactoryContractEthers.on("buurnProject", (tokenId, projectNumber) => {
  console.log("project details burned ", tokenId, projectNumber);
});


