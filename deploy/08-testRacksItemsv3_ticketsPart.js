/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat deploy --tags testRacksItemsv3_ticketsPart --network mumbai' */

    // This Script is used to test the Ticket functionality

    const { ethers } =  require("hardhat");
    
    module.exports = async ({ getNamedAccounts, deployments }) => {
    
        const { deployer } = await getNamedAccounts()
        const racksItems = await ethers.getContract("RacksItemsv3", deployer)
        const racksToken = await ethers.getContract("RacksToken", deployer)
 /*
        //1st -> list Ticket
        console.log("LIST TICKET TEST")
        console.log("Listing ticket...")
        const listTicketTx = await racksItems.listTicket(2,5,5, {gasLimit: 9999999})
        const listTicketTxReceipt = await listTicketTx.wait(1)
        console.log("Ticket listed!")

        const getITicketsOnSaleTx = await racksItems.getITicketsOnSale()
        console.log("Tickets on sale: " + getITicketsOnSaleTx)
        
       
        //2nd -> unlist Ticket
        console.log("UNLIST TICKET TEST")
        console.log("UnListing ticket...")
        const unListTicketTx = await racksItems.unListTicket(0, {gasLimit: 9999999})
        const unListTicketTxReceipt = await unListTicketTx.wait(1)
        console.log("Ticket unListed!")

        const getITicketsOnSaleTx = await racksItems.getITicketsOnSale()
        console.log("Tickets on sale: " + getITicketsOnSaleTx)
*/
        //3rd -> change Ticket conditions
        console.log("CHANGE TICKET CONDITIONS TESTS")
        console.log("Changing ticket conditions...")
        const changeTicketConditionsTx = await racksItems.changeTicketConditions(1,2,2, {gasLimit: 9999999})
        const changeTicketConditionsTxReceipt = await changeTicketConditionsTx.wait(1)
        console.log("Tickets conditions changed!")
        const getITicketsOnSaleTx = await racksItems.getITicketsOnSale()
        console.log("Tickets on sale: " + getITicketsOnSaleTx)

        
    
    }
    module.exports.tags = ["all", "testRacksItemsv3_ticketsPart"]