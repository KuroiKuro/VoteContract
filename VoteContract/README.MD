# VoteContract Smart Contracts
This folder contains the smart contracts for the voting system.

# VoteContract
The main smart contract is VoteContract. It is responsible for maintaining a list of candidates and maintains the voting counts for the candidates.

# VoterRoll
The VoterRoll smart contract is designed to managed the voters. It handles the enrollment of voters via their addresses, and has modifiers to allow the VoteContract smart contract to enforce that voters can only vote if they are enrolled, and if they have not voted before. Also exposes some view functions to view the voter enrollment and voting status