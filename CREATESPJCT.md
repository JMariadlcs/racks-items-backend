# Racks-items-backend

## Requirements for creating similar projects from scratch
- Start hardhat project:
```bash
npm init -y
npm install --save-dev hardhat
npx hardhat
```
- Add .gitignore file containing:
```bash
node_modules
.env
coverage
coverage.json
typechain
deployments

#Hardhat files
cache
artifacts
```

Notice: you can include more ignore cases in your `.gitignore` by copying the content from [.gitignore](https://github.com/JMariadlcs/raffle-full-stack/blob/main/.gitignore).

- Install dependencies:
```bash
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage dotenv @chainlink/contracts base64-sol
```

## Compile and Deploy Smart Contracts
We are compiling the Smart Contracts and then deploying them to Polygong Testnet Mumbai.

In order to do so you will first need to create a `.env` file that should contain provider RPC (`STAGING_ALCHEMY_KEY`) and the private key of the wallet you are using to deploy the contracts (`PRIVATE_KEY`).

**NOTICE:** do NOT upload your `.env` file to GitHub or any other sites.

- Compile:
```bash
npx hardhat compile
```
or
```bash
yarn hardhat compile
```

- Deploy to Mumbai Testnet: 
```bash
npx hardhat deploy --network mumbai
```
or
```bash
yarn hardhat deploy --network mumbai
```
