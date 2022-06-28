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
                const tokenCounter = await metaStarNft.getTokenCounter()
                const superSmallTokenCounter = await metaStarNft.getSuperSmallTokenCounter();
                const smallTokenCounter = await metaStarNft.getSmallTokenCounter();
                const mediumTokenCounter = await metaStarNft.getMediumTokenCounter();
                const bigTokenCounter = await metaStarNft.getBigTokenCounter();
                const specialCounter = await metaStarNft.getSpecialTokenCounter();
                const discountFactor = await metaStarNft.getDiscountFactor();
                const maxSupply = await metaStarNft.getMaxSupply()
                const starUriZero = await metaStarNft.getStarTokenUris(0)
                const mintFee_type0 = await metaStarNft.getMintFee_type0()
                const mintFee_type1 = await metaStarNft.getMintFee_type1()
                const mintFee_type2 = await metaStarNft.getMintFee_type2()
                const mintFee_type3 = await metaStarNft.getMintFee_type3()
                const mintFee_type4 = await metaStarNft.getMintFee_type4()

                assert.equal(contractState.toString(), "0")
                assert.equal(tokenCounter.toString(), "0")
                assert.equal(superSmallTokenCounter.toString(), "0")
                assert.equal(smallTokenCounter.toString(), "0")
                assert.equal(mediumTokenCounter.toString(), "0")
                assert.equal(bigTokenCounter.toString(), "0")
                assert.equal(specialCounter.toString(), "0")
                assert.equal(discountFactor.toString(), "10")
                assert.equal(maxSupply.toString(), "8912")
                assert(starUriZero.includes("ipfs://"))
                assert.equal(mintFee_type0, "10000000000000000")
                assert.equal(mintFee_type1, "20000000000000000")
                assert.equal(mintFee_type2, "30000000000000000")
                assert.equal(mintFee_type3, "40000000000000000")
                assert.equal(mintFee_type4, "50000000000000000")
            })
        })
    })
