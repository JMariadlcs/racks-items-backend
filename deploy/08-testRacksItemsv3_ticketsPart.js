/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat deploy --tags testRacksItemsv3_ticketsPart --network mumbai' */

    // This Script is used to test the Ticket functionality

    const { ethers } =  require("hardhat");
    
    module.exports = async ({ getNamedAccounts, deployments }) => {
    
        const { deployer } = await getNamedAccounts()
        const racksItems = await ethers.getContract("RacksItemsv3", deployer)
        const racksToken = await ethers.getContract("RacksToken", deployer)

        //1st -> list ticket
        console.log("LIST TICKET TEST")
        console.log("Listing ticket...")
        const listTicketTx = await racksItems.listTicket('2','12','5', {gasLimit: 9999999})
        const listTicketTxReceipt = await listTicketTx.wait(1)
        console.log("Ticket listed!")


        
    
    }
    module.exports.tags = ["all", "testRacksItemsv3_ticketsPart"]