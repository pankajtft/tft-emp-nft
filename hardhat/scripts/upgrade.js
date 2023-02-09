async function main() {
  const emsv2 = await ethers.getContractFactory("EMSV2");
  let Emsv2 = await upgrades.upgradeProxy(
    "0x4605B7eDFcc0F340d47e40B9E8D0a18A84162b64",
    emsv2
  );
  console.log("your upgraded Proxy is done:", Emsv2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
