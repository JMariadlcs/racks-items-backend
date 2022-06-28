/* This Script is used to deploy RacksToken.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat deploy --tags mockMrCryptoToken --network mumbai' */

const { ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // Deploy MockMrCryptoToken.sol Smart Contract
    const MockMrCryptoToken = await deploy("MockMrCryptoToken", {
        from: deployer,
        log: true,
    })

    if (!developmentChains.includes(network.name) && process.env.POLYSCAN_API_KEY) {
        log("Verifying...")
        await verify(MockMrCryptoToken.address, args)
    }
}

module.exports.tags = ["all", "mockMrCryptoToken"]