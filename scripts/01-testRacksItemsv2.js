/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat run scripts/01-testRacksItemsv2 --network mumbai' */
const { ethers } = require("hardhat");

async function test() {

    const { deployer } = await getNamedAccounts()
    const racksItems = await ethers.getContract("RacksItemsv2", deployer)
    const racksToken = await ethers.getContract("RacksToken", deployer)

    // FUNCTION TESTING

    //1st -> Change casePrice

    console.log("CHANGE CASE PRICE TEST")
    const setCasePricetTx = await racksItems.setCasePrice('10000000000000000', { gasLimit: 9999999 })
    console.log("Changing case price to " + setCasePricetTx.toString() + "...")
    const racksTokenMintTxReceipt = await setCasePricetTx.wait(1)
    const getCasePriceTx = await racksItems.getCasePrice()
    console.log("Case price changed to " + getCasePriceTx)


    //2nd -> mint item
    console.log("MINT ITEM TEST")
    const mintItemTx = await racksItems.listItem(2, { gasLimit: 9999999 });
    console.log("Minting 2 items to contract address...")
    const mintItemTxReceipt = await mintItemTx.wait(1);
    console.log("Minted!");

    //3rd -> set itemUri
    console.log("SET ITEM URI TEST")
    var testTokenUri = '{"name": "item2" , "image": "https://m.media-amazon.com/images/I/41Uvj2-tlSL._AC_UX385_.jpg"}'
    const setUriTx = await racksItems.setTokenUri(2, testTokenUri, { gasLimit: 9999999 })
    console.log("Setting tokenUri...");
    const setUriTxReceipt = await setUriTx.wait(2);
    console.log("Uri set!")
    const getUriTx = await racksItems.uri(2);
    console.log("Uri set to: " + getUriTx.toString());


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


    //5th -> withdraw all funds
    console.log("WITHDRAW ALL FUNDS TEST")
    console.log("Withdrawing all funds to address: " + deployer.toString() + "...")
    const withdrawAllFundsTx = await racksItems.withdrawAllFunds(deployer, { gasLimit: 9999999 })
    const withdrawAllFundsTxReceipt = await withdrawAllFundsTx.wait(1)
    console.log("Funds succesfully withdrawed!")

    //6th -> listItemtoSell
    console.log("LIST ITEM TO SELL TEST")
    console.log("Listing item to sell...")
    const listItemTx = await racksItems.sellItem(1, '50000000000000000000', { gasLimit: 9999999 })
    const listItemTxReceipt = await listItemTx.wait(1);
    console.log("Item listed!");

    console.log("GET ITEMS ON SALE TEST")
    console.log("Getting items on sale...")
    const getItemsOnSaleTx = await racksItems.getItemsOnSale()
    console.log("List of items on sale: " + getItemsOnSaleTx);
}

test()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })