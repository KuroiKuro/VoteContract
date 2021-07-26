//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VoteContract is Ownable {
    // Candidate names are stored as strings

    string[] public candidates;
    mapping (string => uint) public candidateVotes;
    // A voter roll to keep track of registered voters, and also to track
    // their voting status. Bool is true if the voter has voted 
    mapping (address => bool) voterRoll;

    constructor(string[] memory _candidates) {
        candidates = _candidates;
    }

    function _compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function setCandidates(string[] memory _newCandidateList) external onlyOwner {
        candidates = _newCandidateList;
        for (uint i = 0; i < candidates.length; i++) {
            // Initialize all votes to 0
            string memory candidate = candidates[i];
            candidateVotes[candidate] = 0;
        }
    }

    function enrollVoters(address[] memory _voterAddresses) external onlyOwner {
        for (uint i = 0; i < _voterAddresses.length; i++) {
            voterRoll[_voterAddresses[i]] = false;
        }
    }

    modifier candidateExists(string memory _candidate) {
        bool exists = false;
        for (uint i = 0; i < candidates.length; i++) {
            if (_compareStrings(_candidate, candidates[i])) {
                exists = true;
                break;
            }
        }
        require(exists);
        _;
    }

    modifier hasNotVoted() {
        require(voterRoll[msg.sender] == false);
        _;
    }

    function _mark_voter_voted(address _voter) internal {
        voterRoll[_voter] = true;
    }

    function vote(string memory candidate) external candidateExists(candidate) hasNotVoted {
        candidateVotes[candidate]++;
        _mark_voter_voted(msg.sender);
    }

    function checkVoteStatus(address _voterAddress) external view returns (bool) {
        return voterRoll[_voterAddress];
    }
}
