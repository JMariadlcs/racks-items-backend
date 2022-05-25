/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat deploy --tags racksitemsv2 --network mumbai' */

    const { ethers } = require("hardhat");
    const { get } = require("http");
    
    // Parameters for VRFCoordinator
    const VRF_CoordinatorAddress = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed";
    const gasLane = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f";
    const subscriptionId = "286";
    const callbackGasLimit = "100000";
    
    
    module.exports = async({getNamedAccounts, deployments}) => {
        const { deploy, log } = deployments
        const { deployer } = await getNamedAccounts()
        // We need the Contract's arguments for deploy
        const racksToken = await ethers.getContract("RacksToken");
        const args = [VRF_CoordinatorAddress, gasLane, subscriptionId, callbackGasLimit, racksToken.address.toString()]
        // Deploy Raffle.sol Smart Contract
        const RacksItems = await deploy("RacksItemsv3", {
            from: deployer,
            args: args,
            log: true,
        })
    }
    
    module.exports.tags = ["all", "racksitemsv3"]