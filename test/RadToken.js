// test/RADToken-test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("RADToken", function () {
  // Define the fixture to deploy RADToken
  async function deployRADTokenFixture() {
    const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const RADToken = await ethers.getContractFactory("RADToken");
    const baseURI =
      "https://gateway.pinata.cloud/ipfs/Qmar8RRAZ5QoVPTzvrRk9PcFSm9YKbkanxmd951nXk2bgM";
    const radToken = await RADToken.deploy(owner.address, baseURI);

    return { radToken, owner, addr1, addr2, addrs };
  }

  describe("Minting", function () {
    it("Should mint a token", async function () {
      const { radToken, addr1 } = await loadFixture(deployRADTokenFixture);
      await radToken.mint(addr1.address, 1, 100, "0x");
      expect(await radToken.balanceOf(addr1.address, 1)).to.equal(100);
    });

    it("Should mint multiple tokens in batch", async function () {
      const { radToken, addr1 } = await loadFixture(deployRADTokenFixture);
      await radToken.mintBatch(addr1.address, [1, 2], [100, 200], "0x");
      expect(await radToken.balanceOf(addr1.address, 1)).to.equal(100);
      expect(await radToken.balanceOf(addr1.address, 2)).to.equal(200);
    });
  });

  describe("URI Management", function () {
    it("Should return correct token URI", async function () {
      const { radToken } = await loadFixture(deployRADTokenFixture);
      expect(await radToken.uri(1)).to.equal(
        "https://gateway.pinata.cloud/ipfs/Qmar8RRAZ5QoVPTzvrRk9PcFSm9YKbkanxmd951nXk2bgM1.json"
      );
    });

    it("Should set new URI and return correct token URI", async function () {
      const { radToken } = await loadFixture(deployRADTokenFixture);
      const newBaseURI = "https://newbase.uri/"; //just an example
      await radToken.setURI(newBaseURI);
      expect(await radToken.uri(1)).to.equal(newBaseURI + "1.json");
    });
  });

  describe("Burning", function () {
    it("Should burn a token", async function () {
      const { radToken, addr1 } = await loadFixture(deployRADTokenFixture);
      await radToken.mint(addr1.address, 1, 100, "0x");
      await radToken.burn(addr1.address, 1, 50);
      expect(await radToken.balanceOf(addr1.address, 1)).to.equal(50);
    });

    it("Should burn multiple tokens in batch", async function () {
      const { radToken, addr1 } = await loadFixture(deployRADTokenFixture);
      await radToken.mintBatch(addr1.address, [1, 2], [100, 200], "0x");
      await radToken.burnBatch(addr1.address, [1, 2], [50, 100]);
      expect(await radToken.balanceOf(addr1.address, 1)).to.equal(50);
      expect(await radToken.balanceOf(addr1.address, 2)).to.equal(100);
    });
  });
});
