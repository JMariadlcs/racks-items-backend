/* This Script is used to deploy RacksToken.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat deploy --tags racksToken --network mumbai' */

const { ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // Deploy RacksToken.sol Smart Contract
    const RacksToken = await deploy("RacksToken", {
        from: deployer,
        log: true,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.POLYSCAN_API_KEY) {
        log("Verifying...")
        await verify(RacksToken.address, args)
    }
}

module.exports.tags = ["all", "racksToken"]