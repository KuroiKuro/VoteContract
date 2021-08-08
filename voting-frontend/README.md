# VoteContract App Frontend
This folder contains the frontend that is used to interact with the VoteContract smart contract. It is built using React.

The frontend has 2 main functionalities:
* Perform voting admin tasks, such as enrolling voters
* Allow voters to make the actual vote

# Voting Admin
The organization using VoteContract to handle the voting should be the owner of the contract, as we can assume that they are the ones who deployed the contract to the blockchain. As the owner of the contract, the voting organization needs to handle some administrative tasks, such as enrolling the blockchain addresses of eligible voters and registering the names of candidates.

# Voters
After the voting organization has enrolled their blockchain addresses into the smart contract, voters can then make use of the voting functionality of the frontend to make their vote for their desired candidate.