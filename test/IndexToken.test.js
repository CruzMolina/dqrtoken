const {
  shouldBehaveLikeBurnableToken
} = require("./behaviors/BurnableToken.behavior");
const {
  shouldBehaveLikeMintableToken
} = require("./behaviors/MintableToken.behavior");

const {
  shouldBehaveLikePausableToken
} = require("./behaviors/PausableToken.behavior");

const IndexToken = artifacts.require("IndexToken");

contract("IndexToken", function([_, owner, ...otherAccounts]) {
  const burnAmount = 1000;

  beforeEach(async function() {
    this.token = await IndexToken.new({ from: owner });
  });

  shouldBehaveLikeMintableToken(owner, owner, otherAccounts);
  shouldBehaveLikeBurnableToken(owner, burnAmount, otherAccounts);
  shouldBehaveLikePausableToken(owner, otherAccounts, otherAccounts);
});
