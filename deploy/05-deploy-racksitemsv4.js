/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat deploy --tags racksitemsv4 --network mumbai' */

const { ethers } = require("hardhat");
const { get } = require("http");
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

// Parameters for VRFCoordinator
const VRF_CoordinatorAddress = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed";
const gasLane = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f";
const subscriptionId = "863";
const callbackGasLimit = "100000";


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // We need the Contract's arguments for deploy
    const racksToken = await ethers.getContract("RacksToken");
    const mockMrCryptoToken = await ethers.getContract("MockMrCryptoToken")
    const args = [VRF_CoordinatorAddress, gasLane, subscriptionId, callbackGasLimit, racksToken.address, mockMrCryptoToken.address]
    // Deploy Raffle.sol Smart Contract
    const RacksItems = await deploy("RacksItemsv4", {
        from: deployer,
        args: args,
        log: true,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.POLYSCAN_API_KEY) {
        log("Verifying...")
        await verify(RacksItems.address, args)
    }
}

module.exports.tags = ["all", "racksitemsv4"]