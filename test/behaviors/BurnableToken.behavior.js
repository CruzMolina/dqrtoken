const { assertRevert } = require("../helpers/assertRevert");
const expectEvent = require("../helpers/expectEvent");

const BigNumber = web3.BigNumber;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

require("chai")
  .use(require("chai-bignumber")(BigNumber))
  .should();

function shouldBehaveLikeBurnableToken(owner, burnAmount, [burner]) {
  beforeEach(async function() {
    await this.token.mint(owner, burnAmount, {
      from: owner
    });
  });
  describe("burn", function() {
    describe("when the given amount is not greater than balance of the sender", function() {
      context("for a zero amount", function() {
        shouldBurn(0);
      });

      context("for a non-zero amount", function() {
        shouldBurn(100);
      });

      function shouldBurn(amount) {
        beforeEach(async function() {
          ({ logs: this.logs } = await this.token.burn(amount, {
            from: owner
          }));
        });

        it("burns the requested amount", async function() {
          (await this.token.balanceOf(owner)).should.be.bignumber.equal(
            burnAmount - amount
          );
        });

        it("emits a burn event", async function() {
          const event = expectEvent.inLogs(this.logs, "Burn");
          event.args.burner.should.equal(owner);
          event.args.value.should.be.bignumber.equal(amount);
        });
      }
    });

    describe("when the given amount is greater than the balance of the sender", function() {
      const amount = burnAmount + 1;

      it("reverts", async function() {
        await assertRevert(this.token.burn(amount, { from: owner }));
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeBurnableToken
};
