/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'npx hardhat deploy --tags mint --network mumbai' */
    const { ethers } =  require("hardhat");
    
    module.exports = async ({ getNamedAccounts, deployments }) => {
    
        const { deployer } = await getNamedAccounts()
        const racksItems = await ethers.getContract("RacksItems", deployer)

        // FUNCTION TESTING

        //1st -> Change casePrice
        console.log("CHANGE CASE PRICE TEST")
        const decimals = 1000000000000000000n; // 10e18 
        const newCasePrice = 20; // 20 RacksTokens
        const setCasePricetTx = await racksItems.setCasePrice(BigInt(20) * decimals, {gasLimit: 9999999})
        console.log("Changing case price to " + setCasePricetTx + "...")
        const racksTokenMintTxReceipt = await setCasePricetTx.wait(1)
        console.log("Case price changed to " + newCasePrice)

        //2st -> mint item
        console.log("MINT ITEM TEST")
        const mintItemTx = await racksItems.listItem(2, {gasLimit: 9999999});
        console.log("Minting 2 items to contract address...")
        const mintItemTxReceipt = await mintItemTx.wait(1);
        console.log("Minted!");

        //3st -> set itemUri
        console.log("SET ITEM URI TEST")
        var testTokenUri = { "id": 0, "name": "item0" , "image": ""}
        const setUriTx = await racksItems.setTokenUri(testTokenUri,{gasLimit: 9999999})
        console.log("Setting tokenUri...");
        const setUriTxReceipt = await setUriTx.wait(1);
        console.log("Uri set!")
    }
    
    module.exports.tags = ["all", "testRacksItems"]