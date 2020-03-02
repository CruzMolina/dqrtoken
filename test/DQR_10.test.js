const {
  shouldBehaveLikeBurnableToken
} = require("./behaviors/BurnableToken.behavior");
const {
  shouldBehaveLikeMintableToken
} = require("./behaviors/MintableToken.behavior");

const {
  shouldBehaveLikePausableToken
} = require("./behaviors/PausableToken.behavior");

const DQR_10 = artifacts.require("DQR10");

contract("DQR_10", function([_, owner, ...otherAccounts]) {
  const burnAmount = 1000;

  beforeEach(async function() {
    this.token = await DQR_10.new({ from: owner });
  });

  shouldBehaveLikeMintableToken(owner, owner, otherAccounts);
  shouldBehaveLikeBurnableToken(owner, burnAmount, otherAccounts);
  shouldBehaveLikePausableToken(owner, otherAccounts, otherAccounts);
});
