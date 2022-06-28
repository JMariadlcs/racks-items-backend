# Racks-items-backend

## Requirements for creating similar projects from scratch

- Install yarn and start hardhat project:

```bash
yarn
yarn add --dev hardhat
yarn hardhat
```

- Install ALL the dependencies:

```bash
yarn add --dev @nomiclabs/hardhat-waffle@^2.0.0 ethereum-waffle@^3.0.0 chai@^4.2.0 @nomiclabs/hardhat-ethers@^2.0.0 ethers@^5.0.0 @nomiclabs/hardhat-etherscan@^3.0.0 dotenv@^16.0.0 eslint@^7.29.0 eslint-config-prettier@^8.3.0 eslint-config-standard@^16.0.3 eslint-plugin-import@^2.23.4 eslint-plugin-node@^11.1.0 eslint-plugin-prettier@^3.4.0 eslint-plugin-promise@^5.1.0 hardhat-gas-reporter@^1.0.4 prettier@^2.3.2 prettier-plugin-solidity@^1.0.0-beta.13 solhint@^3.3.6 solidity-coverage@^0.7.16 @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @chainlink/contracts hardhat-deploy hardhat-shorthand @aave/protocol-v2
```

- Install OpenZeppelin dependencies (contracts):

```bash
yarn add --dev @openzeppelin/contracts
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
