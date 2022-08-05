# RACKS ITEMS 👕👖

This is an implementation of a 'Tokenized Decentralized Commerce' where users are able to win items that are represented by ERC-1155 tokens on the Polygon Network. Only users that owns a MrCrypto (ERC721) are able to win theses clothers. Normal users that do not own the ERC721 token can buy "tickets" from users that do owns the ERC721 token in order to win items.

The way users are able to win different clothes is by opening a **FULLY DENCENTRALIZED RANDOM CASE** by paying Racks Tokens.

A second hand MarketPlace of items is also being implemented.

This repo contains 6 implemented Smart Contracts and its interfaces:

- [RacksToken.sol](https://github.com/devScrooge/racks-items-backend/blob/main/contracts/RacksToken.sol): an implementation of RacksToken.
- [MrCryptoMock.sol](https://github.com/devScrooge/racks-items-backend/blob/main/contracts/MrCryptoMock.sol): a simulation of MrCrypto NFT needed to test some functions.
- [RacksItems.sol](https://github.com/devScrooge/racks-items-backend/blob/main/contracts/RacksItems.sol): final version of the main script of the project.
- [CaseOpener.sol](https://github.com/devScrooge/racks-items-backend/blob/main/contracts/CaseOpener.sol): contract used to handle the items case.
- [Tickets.sol](https://github.com/devScrooge/racks-items-backend/blob/main/contracts/Tickets.sol): contract used to handle the tickets part.

🚨 Every detail is going to be described in this report.

## Table of Contents

1. [Who can participate?](#participate)
   1. [VIP users](#vip)
   2. [Normal users](#normal)
2. [Features](#features)
   1. [Users point of view](#usersview)
   2. [Racks point of view](#racksview)
3. [Randomness](#randomness)

<a name="participate"/>

## Who can participate?

Eligible users for participating in the above mentioned 'case openning' are the ones that meet 2 requirements:

<a name="vip"/>

- **VIP USERS**:

1. Users that **OWNS AL LEAST 1 MrCrypto TOKEN** ✅.

<a name="normal"/>

- **NORMAL USERS**:
  Users that does not own a MrCrypto will also be able to open cases by:

3. Buying a 'Case Ticket' from a VIP USER.

<a name="Features"/>

## Features

<a name="usersview"/>

### Users point of view

#### VIP users:

- [**Open cases by using RacksTokens**].
- [**Lend 'Case Ticket' to not VIP users**]: each user can assign the duration of the lending ticket, the number of tries that the ticket allows to open the case and the ticket price. By giving the user the power of decide the values for these 3 variables we are avoiding the tickets floor price to go down. If all tickets were dessgined with a fixed duration and number of tries every user will assign a lower price just to sell his ticket.

**Notice:** Each user can only lend 1 ticket at the same time and VIP users will not be able to open cases at the same time they are lending his ticket to a normal user.

#### Normal users:

- [**Open cases without being vip**]: no VIP users will also have the chance of winning clothes by openning cases withouth having a MrCrypto. In order to do so, a normal user will need to buy a ticket on the RacksItems MarketPlace.

👉🏼 At this point you may be thinking... **what is the intention of winning tokenized clothes/items?**

The intentions of the project could be various:

- The clothes/items that a user is winning could be used in the future upcoming metaverse. To dress up your character on the metaverse.
- Clothes could be also combined with your MrCrypto to generate a new MrCrypto NFT by joining your already existing MrCrypto and your ERC1155 item token.
- Users are also able to 'exchange' the items they got in the case. What does that means? This means that the user is changing the token for a physical item that will recive at home. If a user exchanges one of his items, the associated token to the item is going to be burned.

<a name="racksview"/>

### Racks point of view

Appart from the funny user experience that RacksItems proporcionates to the user it also have some befenits/functionalities for the owner/admins.

1. MrCrypto gains utility.
2. MrCrypto users can earn funds by generating tickets and lending them.
3. Owner token (RacksToken) is used to open cases -> Token demand grows
4. Structure of the project is designed in a way that the owner/admins can include new items each time they want.
5. Owner/admins can regulate the supply of the items -> can introduce new items more "rare" if supply is lower compare with the rest of the items.
6. Owner/admins are the ones wo also set up the uris metadata for the items.

<a name="randomness"/>

## Randomness (Chainlink VRF)

One of the most important features for a project that includes a "random factor'" to be valuable is to be actually random. This could sound a little weird but in fact almost anything in live is random. Many projects that are live out there and consider themselves as "random" are trully not random.

Achieving randomness in computer science is not an easy task and even less easy when we are talking in a blockchain environment.

The most valuable part of this project is that **trully randomness is achieved**. The way this randomness is achieved is by implementing [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/).

Chainlink VRF (Verifiable Random Function) is a provably fair and verifiable random number generator (RNG) that enables smart contracts to access random values without compromising security or usability.

For each request, Chainlink VRF generates one or more random values and cryptographic proof of how those values were determined. The proof is published and verified on-chain before any consuming applications can use it. This process ensures that results cannot be tampered with or manipulated by any single entity including oracle operators, miners, users, or smart contract developers.

If you are more curious about Chainlink VRF and how randomness is achieved take a look to [this video](https://www.youtube.com/watch?v=rdJ5d8j1RCg&feature=emb_title).
