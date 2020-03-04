const DQR_10 = artifacts.require("DQR10");
const DQR_30 = artifacts.require("DQR30");

module.exports = deployer => {
  deployer.deploy(DQR_10);
  deployer.deploy(DQR_30);
};
