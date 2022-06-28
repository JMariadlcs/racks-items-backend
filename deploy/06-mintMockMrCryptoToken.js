/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat deploy --tags mintMockMrCryptoToken --network mumbai' */

const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {

    const MockMrCryptoTokenId = 1; //MrCryptoTokens
    const { deployer } = await getNamedAccounts()
    const mockMrCryptoToken = await ethers.getContract("MockMrCryptoToken", deployer)
    const mockMrCryptoTokenTx = await mockMrCryptoToken.mint(deployer, MockMrCryptoTokenId, { gasLimit: 9999999 })
    console.log("Minting NFT with Id: " + MockMrCryptoTokenId + " MockMrCryptoToken to wallet: " + deployer);
    const mockMrCryptoTokenTxReceipt = await mockMrCryptoTokenTx.wait(1)
}

module.exports.tags = ["all", "mintMockMrCryptoToken"]