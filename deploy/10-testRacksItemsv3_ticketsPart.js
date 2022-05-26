/* This Script is used to deploy RacksItems.sol contract into a TESTNET
     Deploy: 'yarn hardhat deploy --network mumbai'
    or 'yarn hardhat deploy --tags testRacksItemsv3_ticketsPart --network mumbai' */

    // This Script is used to test the Ticket functionality

    const { ethers } =  require("hardhat");
    
    module.exports = async ({ getNamedAccounts, deployments }) => {
    
        const { deployer } = await getNamedAccounts()
        const racksItems = await ethers.getContract("RacksItemsv3", deployer)
        const racksToken = await ethers.getContract("RacksToken", deployer)
        console.log("RacksItemsv3 address: " + racksItems.address.toString())
        console.log("RacksToken address: " + racksToken.address.toString())
 /*
        //0 -> set RacksMember
        console.log("SET RACKS MEMBER TEST")
        console.log("Setting racks member....")
        const setRacksMemberTx = await racksItems.setSingleRacksMember(deployer)
        const setRacksMemberTxReceipt = await setRacksMemberTx.wait(1)
        console.log("Racks member set!")
 */
        //1st -> list Ticket
        console.log("LIST TICKET TEST")
        console.log("Listing ticket...")
        const listTicketTx = await racksItems.listTicket(2,5,5, {gasLimit: 9999999})
        const listTicketTxReceipt = await listTicketTx.wait(1)
        console.log("Ticket listed!")

        const getITicketsOnSaleTx = await racksItems.getITicketsOnSale()
        console.log("Tickets on sale: " + getITicketsOnSaleTx)
        /*
      
        //2nd -> unlist Ticket
        console.log("UNLIST TICKET TEST")
        console.log("UnListing ticket...")
        const unListTicketTx = await racksItems.unListTicket(0, {gasLimit: 9999999})
        const unListTicketTxReceipt = await unListTicketTx.wait(1)
        console.log("Ticket unListed!")

        const getITicketsOnSaleTx2 = await racksItems.getITicketsOnSale()
        console.log("Tickets on sale: " + getITicketsOnSaleTx2)

        //3rd -> change Ticket conditions
        console.log("CHANGE TICKET CONDITIONS TESTS")
        console.log("Changing ticket conditions...")
        const changeTicketConditionsTx = await racksItems.changeTicketConditions(0, 2, 2, 2, {gasLimit: 9999999})
        const changeTicketConditionsTxReceipt = await changeTicketConditionsTx.wait(1)
        console.log("Tickets conditions changed!")
        
        const getITicketsOnSaleTx3 = await racksItems.getITicketsOnSale()
        console.log("Tickets on sale: " + getITicketsOnSaleTx3)

        
        //4th -> get ticket duration left
        console.log("GET TICKET DURATION LEFT")
        console.log("Getting ticket duration left...")
        const getTicketDurationLeftTx = await racksItems.getTicketDurationLeft(0)
        console.log("Ticket duration left is: " + getTicketDurationLeftTx)
/*
        //5th -> buy ticket
        // need to change account! (buy with an account that is not owner and NOT VIP)
        console.log("BUY TICKET TEST")
        const isVipTx = await racksItems.isVip(deployer)
        console.log("User is: " + isVipTx + " VIP");

        console.log("Approving racksTokens...")
        const approveRacksTokenTx4 = await racksToken.approve(racksItems.address, 90000000000000000000n)
        const approveRacksTokenTxReceipt2 = await approveRacksTokenTx4.wait(1);
        console.log("RacksToken approved!")
      
        console.log("Buying ticket...")
        const buyTicketTx = await racksItems.buyTicket(0, {gasLimit: 9999999})
        const buyTicketTxReceipt = await buyTicketTx.wait(1)
        console.log("Ticket bought!")
         
        const getITicketsOnSaleTx5 = await racksItems.getITicketsOnSale()
        console.log("Tickets on sale: " + getITicketsOnSaleTx5)

        //6th -> openCase and see if tickets tries decreases
        // change account to another user that is not owner!
        const getTicketInfoTx = await racksItems.getMarketTicket(0)
        console.log("Ticket info: " + getTicketInfoTx);
        
        const approveRacksTokenTx2 = await racksToken.approve(racksItems.address, 9000000000000000000n)
        const approveRacksTokenTxReceipt3 = await approveRacksTokenTx2.wait(1);
        console.log("RacksToken approved!")
        console.log("Opening case...") 
        const openCaseTx = await racksItems.openCase({gasLimit: 9999999})
        const openCaseTxReceipt = await openCaseTx.wait(1)
        console.log("Case opened! you got item " + openCaseTx.toString())

        const getTicketInfoTx2 = await racksItems.getMarketTicket(0)
        console.log("Ticket info: " + getTicketInfoTx2);*/
    }
    module.exports.tags = ["all", "testRacksItemsv3_ticketsPart"]