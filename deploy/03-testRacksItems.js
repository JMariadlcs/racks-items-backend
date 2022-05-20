/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'npx hardhat deploy --tags mint --network mumbai' */
    const { ethers } =  require("hardhat");
    
    module.exports = async ({ getNamedAccounts, deployments }) => {
    
        const { deployer } = await getNamedAccounts()
        const racksItems = await ethers.getContract("RacksItems", deployer)

        // FUNCTION TESTING

        //1st -> Change casePrice
        const racksTokenMintTx = await racksItems.mint(deployer, BigInt(racksTokenQuantity) * decimals, {gasLimit: 9999999})
        console.log("Minting " + racksTokenQuantity + " RacksTokens to wallet: " + deployer);
        const racksTokenMintTxReceipt = await racksTokenMintTx.wait(1)

    }
    
    module.exports.tags = ["all", "testRacksItems"]