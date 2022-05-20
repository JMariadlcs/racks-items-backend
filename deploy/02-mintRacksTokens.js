const { ethers } =  require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {

    // Random IPFS NFT
    const { deployer } = await getNamedAccounts()
    const racksToken = await ethers.getContract("RacksToken", deployer)
    const racksTokenMintTx = await racksToken.mint(deployer, 1000, {gasLimit: 9999999})
    const racksTokenMintTxReceipt = await racksTokenMintTx.wait(1)
}

module.exports.tags = ["all", "mint"]