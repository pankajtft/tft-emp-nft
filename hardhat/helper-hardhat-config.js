const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
const frontEndContractsFile = "../client/pages/contract-constants/addresses.json";
const frontEndAbiFile = "../client/pages/contract-constants/abi.json";

module.exports = {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  frontEndContractsFile,
  frontEndAbiFile,
};
