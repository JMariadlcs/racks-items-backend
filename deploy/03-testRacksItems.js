/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat deploy --tags testRacksItems --network mumbai' */
    const { ethers } =  require("hardhat");
    
    module.exports = async ({ getNamedAccounts, deployments }) => {
    
        const { deployer } = await getNamedAccounts()
        const racksItems = await ethers.getContract("RacksItems", deployer)
        const racksToken = await ethers.getContract("RacksToken", deployer)

        // FUNCTION TESTING
        
        //1st -> Change casePrice
        console.log("CHANGE CASE PRICE TEST")
    
  /*
        const setCasePricetTx = await racksItems.setCasePrice('10000000000000000', {gasLimit: 9999999})
        console.log("Changing case price to " + setCasePricetTx.toString() + "...")
        const racksTokenMintTxReceipt = await setCasePricetTx.wait(1)
        const getCasePriceTx = await racksItems.getCasePrice()
        console.log("Case price changed to " + getCasePriceTx)
          

        //2nd -> mint item
        console.log("MINT ITEM TEST")
        const mintItemTx = await racksItems.listItem(2, {gasLimit: 9999999});
        console.log("Minting 2 items to contract address...")
        const mintItemTxReceipt = await mintItemTx.wait(1);
        console.log("Minted!");

        //3rd -> set itemUri
        console.log("SET ITEM URI TEST")
        var testTokenUri = '{"id": 0, "name": "item1" , "image": "https://ipfs.io/ipfs/QmNbphcmAiS2ursxN8upQPzvf52vvpDbAQQb2Ug5ko1pgE?filename=hoodie.webp"}'
        const setUriTx = await racksItems.setTokenUri(3, testTokenUri,{gasLimit: 9999999})
        console.log("Setting tokenUri...");
        const setUriTxReceipt = await setUriTx.wait(1);
        console.log("Uri set!")
        const getUriTx = await racksItems.uri(0);
        console.log("Uri set to: " + getUriTx);
*//*
        //4th -> opencase
        console.log("OPEN CASE TEST")
        console.log("Approving RacksToken...")
        const approveRacksTokenTx = await racksToken.approve(racksItems.address, '100000000000000000000')
        const approveRacksTokenTxReceipt = await approveRacksTokenTx.wait(1);
        console.log("RacksToken approved!")
  
        console.log("Opening case...") 
        const openCaseTx = await racksItems.openCase()
        const openCaseTxReceipt = await openCaseTx.wait(1)
        console.log("Case opened! you got item " + openCaseTx.toString())
 */
        //5th -> withdraw all funds
        console.log("WITHDRAW ALL FUNDS TEST")
        console.log("Withdrawing all funds to address: " + deployer.toString() + "...")
        const withdrawAllFundsTx = await racksItems.withdrawAllFunds(deployer, {gasLimit: 9999999})
        const withdrawAllFundsTxReceipt = await withdrawAllFundsTx.wait(1)
        console.log("Funds succesfully withdrawed!")

  

    }
    
    module.exports.tags = ["all", "testRacksItems"]