const { network } = require("hardhat");
const { storeImage } = require("../utils/upload");

const imageLoc = "/home/shivam/Pictures/hacking.png";

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const factory = await deploy("ReactNFT", {
    from: deployer,
    args: [2],
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (process.env.UPLOAD_TO_IPFS == "true") {
    tokenURI = await storeImage(imageLoc);
  }
};

module.exports.tags = ["all", "fundme"];
