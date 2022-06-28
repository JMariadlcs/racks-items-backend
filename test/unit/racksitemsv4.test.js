/**  Script used to execute unit testing -> ONLY ON DEVELOPMENT CHAINS
 *    To execute all the test: yarn hardhat test
 *    To execute a single test (eg.1st test): yarn hardhat test --grep ""
 *    To see coverage: yarn hardhat coverage
 */

const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("MetaStarNFTV2 Unit Tests", async function () {

        let racksitems, deployer, user_1

        beforeEach(async () => {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            user_1 = accounts[1]
            await deployments.fixture(["all"])
            racksitems = await ethers.getContract("RacksItemsv4", deployer)
            racksitemsuser_1 = await ethers.getContract("RacksItemsv4", user_1)
            const flipContractState = await racksitems.flipContractState()
        })

        describe("constructor", () => {
            it("sets starting values correctly", async function () {
                const contractState = await metaStarNft.getContractState()


                assert.equal(contractState.toString(), "0")

            })
        })
    })
