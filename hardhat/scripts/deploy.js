async function main() {
  const ems = await ethers.getContractFactory("EMS");

  // Start deployment, returning a promise that resolves to a contract object
  const EMS = await ems.deploy();
  console.log("Contract deployed to address:", EMS.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
