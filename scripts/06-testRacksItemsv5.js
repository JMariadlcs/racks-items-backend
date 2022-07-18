/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat run scripts/06-testRacksItemsv5 --network mumbai' */

const { ethers } = require("hardhat");

async function test() {

    const { deployer } = await getNamedAccounts()
    const racksItems = await ethers.getContract("RacksItemsv5", deployer)
    const mrCrypto = await ethers.getContract("MockMrCryptoToken", deployer)
    const racksToken = await ethers.getContract("RacksToken", deployer)
    console.log("RacksItemsv5 address: " + racksItems.address.toString())
    console.log("RacksToken address: " + racksToken.address.toString())
    console.log("MrCrypto address: " + mrCrypto.address.toString())
    // FUNCTION TESTING

    //1st -> Change casePrice
    /*
        console.log("CHANGE CASE PRICE TEST")
        const setCasePricetTx = await racksItems.setCasePrice('1', { gasLimit: 9999999 })
        console.log("Changing case price to " + setCasePricetTx.toString() + "...")
        const racksTokenMintTxReceipt = await setCasePricetTx.wait(1)
    */
    //2nd -> mint item
    console.log("MINT ITEM TEST")
    const mintItemTx = await racksItems.listItem(5);
    const mintItemTx2 = await racksItems.listItem(5);
    const mintItemTx3 = await racksItems.listItem(5);
    console.log("Minting items to contract address...")
    const mintItemTxReceipt = await mintItemTx.wait(1);
    console.log("Minted!");

    //3rd -> set itemUri
    console.log("SET ITEM URI TEST")
    var testTokenUri = '{"name": "item2" , "image": "https://m.media-amazon.com/images/I/41Uvj2-tlSL._AC_UX385_.jpg"}'
    const setUriTx = await racksItems.setTokenUri(3, testTokenUri)
    const setUriTx2 = await racksItems.setTokenUri(4, testTokenUri)
    const setUriTx3 = await racksItems.setTokenUri(5, testTokenUri)

    console.log("Setting tokenUri...");
    const setUriTxReceipt = await setUriTx.wait(1);
    console.log("Uri set!")
    const getUriTx = await racksItems.uri(0);
    console.log("Uri set to: " + getUriTx.toString());


}

test()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
