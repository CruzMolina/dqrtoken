const {
  shouldBehaveLikeBurnableToken
} = require("./behaviors/BurnableToken.behavior");
const {
  shouldBehaveLikeMintableToken
} = require("./behaviors/MintableToken.behavior");

const {
  shouldBehaveLikePausableToken
} = require("./behaviors/PausableToken.behavior");

const DQR_30 = artifacts.require("DQR30");

contract("DQR_30", function([_, owner, ...otherAccounts]) {
  const burnAmount = 1000;

  beforeEach(async function() {
    this.token = await DQR_30.new({ from: owner });
  });

  shouldBehaveLikeMintableToken(owner, owner, otherAccounts);
  shouldBehaveLikeBurnableToken(owner, burnAmount, otherAccounts);
  shouldBehaveLikePausableToken(owner, otherAccounts, otherAccounts);
});
