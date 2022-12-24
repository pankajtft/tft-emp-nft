require("dotenv").config();
const express = require("express");
const initMongo = require("./config/mongo");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// const { ethers } = require("ethers");
// const address = require("../contract-constants/addresses.json").EMS[31337];
// const abi = require("../contract-constants/abi.json_EMS.json");
// const { createEmployee, addNewProject } = require("./controllers/employee");

// const url = "http://127.0.0.1:8545/";

// const provider = new ethers.providers.JsonRpcProvider(url);
// const FactoryContractEthers = new ethers.Contract(address, abi, provider);

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

// FactoryContractEthers.on(
//   "NFTMinted",
//   (
//     _empId,
//     _employeeName,
//     email,
//     skills,
//     team_size,
//     _projectName,
//     startTime,
//     endTime,
//     tokenId
//   ) => {
//     createEmployee(
//       Number(_empId._hex),
//       _employeeName,
//       email,
//       skills,
//       Number(team_size._hex),
//       _projectName,
//       new Date(Number(startTime._hex)),
//       new Date(Number(endTime._hex)),
//       Number(tokenId._hex)
//     );
//   }
// );

// FactoryContractEthers.on(
//   "NFTChanged",
//   (tokenId, skills, team_size, _projectName, startTime, endTime) => {
//     addNewProject(
//       Number(tokenId._hex),
//       skills,
//       Number(team_size._hex),
//       _projectName,
//       new Date(Number(startTime._hex)),
//       new Date(Number(endTime._hex))
//     );
//   }
// );
