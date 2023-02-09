// const {ethers}=require("ethers");
async function main() {
  const ems = await ethers.getContractFactory("EMS");
  console.log("Deploying Box, ProxyAdmin, and then Proxy...");
  // const accounts = await ethers.provider.listAccounts();
  // const provider = new ethers.providers.JsonRpcProvider(); 
  // console.log(await provider.getBlockNumber());
  // const signer = provider.getSigner();
  // console.log(ethers.utils.parseEther("1.0").toString());
  // console.log(signer);
  const proxy = await upgrades.deployProxy(ems, [], {
    initializer: "initilize",
  });
  await proxy.deployed();
  console.log("Proxy of EMS deployed to:", proxy.address);

  // Start deployment, returning a promise that resolves to a contract object
  // const ems = await ethers.getContractFactory("EMSV2");
  // const EMS = await ems.deploy();
  // console.log("Contract deployed to address:", EMS.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
