/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat run scripts/02-testRacksItemsv3 --network mumbai' */

const { ethers } = require("hardhat");

async function test() {

    const { deployer } = await getNamedAccounts()
    const racksItems = await ethers.getContract("RacksItemsv3", deployer)
    const racksToken = await ethers.getContract("RacksToken", deployer)
    console.log("RacksItemsv3 address: " + racksItems.address.toString())
    console.log("RacksToken address: " + racksToken.address.toString())
    // FUNCTION TESTING

    //1st -> Change casePrice

    /*console.log("CHANGE CASE PRICE TEST")
    const setCasePricetTx = await racksItems.setCasePrice('1000000', {gasLimit: 9999999})
    console.log("Changing case price to " + setCasePricetTx.toString() + "...")
    const racksTokenMintTxReceipt = await setCasePricetTx.wait(1)
    const getCasePriceTx = await racksItems.getCasePrice()
    console.log("Case price changed to " + getCasePriceTx)


    //2nd -> mint item
    console.log("MINT ITEM TEST")
    const mintItemTx = await racksItems.listItem(5, {gasLimit: 9999999});
    console.log("Minting items to contract address...")
    const mintItemTxReceipt = await mintItemTx.wait(1);
    console.log("Minted!"); 

    //3rd -> set itemUri
    console.log("SET ITEM URI TEST")
    var testTokenUri = '{"name": "item2" , "image": "https://m.media-amazon.com/images/I/41Uvj2-tlSL._AC_UX385_.jpg"}'
    const setUriTx = await racksItems.setTokenUri(0, testTokenUri,{gasLimit: 9999999})
    console.log("Setting tokenUri...");
    const setUriTxReceipt = await setUriTx.wait(1); 
    console.log("Uri set!")
    const getUriTx = await racksItems.uri(0);
    console.log("Uri set to: " + getUriTx.toString());
  

    //4th -> opencase
    // Need to set user as racksMember to become VIP (if we are executing with owner)
    console.log("Setting racks member....")
    const setRacksMemberTx = await racksItems.setSingleRacksMember(deployer)
    const setRacksMemberTxReceipt = await setRacksMemberTx.wait(1)
    console.log("Racks member set!") 
     */
    console.log("OPEN CASE TEST")
    console.log("Approving RacksToken...")
    const approveRacksTokenTx = await racksToken.approve(racksItems.address, '100000000000000000000')
    const approveRacksTokenTxReceipt = await approveRacksTokenTx.wait(1);
    console.log("RacksToken approved!")

    console.log("Opening case...")
    const openCaseTx = await racksItems.openCase({ gasLimit: 9999999 })
    const openCaseTxReceipt = await openCaseTx.wait(1)
    console.log("Case opened!")

    /*
     //5th -> withdraw all funds
     console.log("WITHDRAW ALL FUNDS TEST")
     console.log("Withdrawing all funds to address: " + deployer.toString() + "...")
     const withdrawAllFundsTx = await racksItems.withdrawAllFunds(deployer, {gasLimit: 9999999})
     const withdrawAllFundsTxReceipt = await withdrawAllFundsTx.wait(1)
     console.log("Funds succesfully withdrawed!")
     
     //6th -> withdraw specific funds
     console.log("WITHDRAW SPECIFIC AMOUNT OF FUNDS TEST")
     console.log("Withdrawing indicated funds to address: " + deployer.toString() + "...")
     const withdrawSpFundsTx = await racksItems.withdrawFunds(deployer, '5000000000', {gasLimit: 9999999})
     const withdrawSpFundsTxReceipt = await withdrawSpFundsTx.wait(1)
     console.log("Funds succesfully withdrawed!")

     //6th -> listItemtoSell
     console.log("LIST ITEM TO SELL TEST")
     console.log("Listing item to sell...")
     const listItemTx = await racksItems.listItemOnMarket(0, '5', {gasLimit: 9999999})
     const listItemTxReceipt = await listItemTx.wait(1);
     console.log("Item listed!");
    
     console.log("GET ITEMS ON SALE TEST")
     console.log("Getting items on sale...")
     const getItemsOnSaleTx = await racksItems.getItemsOnSale()
     console.log("List of items on sale: " + getItemsOnSaleTx); 

     //7th -> changeItemPrice
     console.log("CHANGE ITEM PRICE TEST")
     console.log("Changing item price...")
     const changeItemPriceTx = await racksItems.changeItemPrice(0, '1', {gasLimit: 9999999})
     const changeItemPriceTxReceipt = await changeItemPriceTx.wait(1)
     console.log("Item price changed!")
     console.log("Getting items on sale...")
     const getItemsOnSaleTx2 = await racksItems.getItemsOnSale()
     console.log("List of items on sale: " + getItemsOnSaleTx2); 
    

     //7th -> unListItem
     console.log("UNLIST ITEM TEST")
     console.log("Unlisting item from MarketPlace...")
     const unListItemTx = await racksItems.unListItem(0, {gasLimit: 9999999})
     const unListItemTxReceipt = await unListItemTx.wait(1)
     console.log("Getting items on sale...")
     const getItemsOnSaleTx3 = await racksItems.getItemsOnSale()
     console.log("List of items on sale: " + getItemsOnSaleTx3); 
     console.log("Item unlisted!")

     
     //Send racksTokens to Account2
     const transferTokensTx = await racksToken.transfer("0x105dD7af9cd6AdD2ACa7913e2f61FeBc40814006",'5000000000000000000', {gasLimit: 9999999})
     const transferTokensTxReceipts = await transferTokensTx.wait(1);
     console.log("Tokens transfered!")
     

     // 8th buy item 
     // Buyer needs to approve rackToken to contract address
     // Seller needs to approve RacksItems to contract address

     console.log("BUY ITEM TEST")
     console.log("Approving rackstokens...")
     const approveRacksTokenTx2 = await racksToken.approve(racksItems.address, '10000000000000000000000')
     const approveRacksTokenTxReceipt2 = await approveRacksTokenTx2.wait(1);
     console.log("RacksToken approved!")
     
     console.log("Approving ERC1155Token...")
     const approveERCTokenTx = await racksItems.setApprovalForAll(racksItems.address, true, {gasLimit: 9999999})
     const approveERCTokenTxReceipt = await approveERCTokenTx.wait(1);
     console.log("ERC1155 approved!")

     
     // -> change account - ITEM IS BOUGHT WITH AN ACCOUNT THAT IS NOT OWNER -> change account
     // notice we are buying item with id:0 but as it was listed again the marketCountId is 1
     console.log("Buying item...")
     const buyItemTx = await racksItems.buyItem(0, {gasLimit: 9999999})
     const buyItemTxReceipt = await buyItemTx.wait(1);
     console.log("Item bought!");
     const getItemTx = await racksItems.getMarketItem(0)
     console.log("Item: " + getItemTx)
     

     //9th -> burn item
     console.log("EXCHANGE ITEM TEST")
     console.log("Exchanging item...")
     const exchangeTx = await racksItems.exchangeItem(0, {gasLimit: 9999999})
     const exchangeTxReceipt = await exchangeTx.wait(1)
     console.log("Item exchanged!")
     */
}

test()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })


