const { assertRevert } = require("../helpers/assertRevert");
const expectEvent = require("../helpers/expectEvent");

const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-bignumber")(BigNumber))
  .should();

function shouldBehaveLikeMintableToken(owner, minter, [anyone]) {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  describe("as a basic mintable token", function() {
    describe("after token creation", function() {
      it("sender should be token owner", async function() {
        (await this.token.owner({ from: owner })).should.equal(owner);
      });
    });

    describe("mint", function() {
      const amount = 100;

      describe("when the sender has the minting permission", function() {
        const from = minter;

        describe("when the token is minted", function() {
          context("for a zero amount", function() {
            shouldMint(0);
          });

          context("for a non-zero amount", function() {
            shouldMint(amount);
          });

          function shouldMint(amount) {
            beforeEach(async function() {
              ({ logs: this.logs } = await this.token.mint(anyone, amount, {
                from
              }));
            });

            it("mints the requested amount", async function() {
              (await this.token.balanceOf(anyone)).should.be.bignumber.equal(
                amount
              );
            });

            it("emits a mint and a transfer event", async function() {
              const mintEvent = expectEvent.inLogs(this.logs, "Mint", {
                to: anyone
              });
              mintEvent.args.amount.should.be.bignumber.equal(amount);

              const transferEvent = expectEvent.inLogs(this.logs, "Transfer", {
                from: ZERO_ADDRESS,
                to: anyone
              });
              transferEvent.args.value.should.be.bignumber.equal(amount);
            });
          }
        });
      });

      describe("when the sender does not have minting permission", function() {
        const from = anyone;

        describe("when the token minting is attempted", function() {
          it("reverts", async function() {
            await assertRevert(this.token.mint(anyone, amount, { from }));
          });
        });
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeMintableToken
};
