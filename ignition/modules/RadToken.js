const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RADTokenModule", (m) => {
  // Get the deployer account
  const deployer = m.getAccount(0);

  // Define the baseURI parameter with a default value
  const baseURI = m.getParameter(
    "baseURI",
    "https://gateway.pinata.cloud/ipfs/Qmar8RRAZ5QoVPTzvrRk9PcFSm9YKbkanxmd951nXk2bgM/"
  );

  // Deploy the RADToken contract
  const radToken = m.contract("RADToken", [deployer, baseURI]);

  return { radToken };
});
