# Smart Contract Voting System

A voting system based on the blockchain! Developed with Solidity and hardhat.

The components of this project are:
* A smart contract used for voting
* A frontend built with React to allow users to vote using Metamask and Ethers.js

Still a work in progress!

# Running
## Deploy Smart Contracts
The smart contract needs to be deployed first. In order to do so, the Hardhat local blockchain needs to be running first.
```bash
cd VoteContract
npm run start-chain  # NPM script to start Hardhat local environment
npm run deploy  # NPM script to run Hardhat deployment script
```
This project requires that the hardhat environment is started using the default wallet addresses.

## Start React Development Server
After the Hardhat local blockchain is running and the smart contract has been deployed to it, the React development server can be started by running the following:
```bash
cd voting-frontend
npm start
```

# Voting Smart Contract
The smart contracts consist of 2 contracts. VoterRoll.sol contains methods dedicated to voter roll management, such as enrolling wallet addresses of voters to allow them to vote. VoteContract.sol handles the tracking of the actual votes for each candidate.

# Voting Frontend
The voting frontend is a react application performs 2 functions:
1) Allow admins to interact with the administrative functions of the smart contract
2) Allow registered voters to vote

The frontend makes use of ethers and requires the metamask browser extension to be installed.
