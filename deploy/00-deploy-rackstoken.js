/* This Script is used to deploy RacksToken.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'npx hardhat deploy --network mumbai' */

    const { ethers } = require("hardhat")
    
    module.exports = async({getNamedAccounts, deployments}) => {
        const { deploy, log } = deployments
        const { deployer } = await getNamedAccounts()
        
        // Deploy RacksToken.sol Smart Contract
        const RacksToken = await deploy("RacksToken", {
            from: deployer,
            log: true,
        })
    }
    
    module.exports.tags = ["all", "racksToken"]