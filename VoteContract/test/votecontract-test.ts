import { ethers } from 'hardhat';
import { expect } from 'chai';
import { ContractFactory, Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe("VoteContract", () => {
    // Declare variables
    let VoteContractFactory: ContractFactory;
    let VoteContract: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addr3: SignerWithAddress;
    let addrs: SignerWithAddress[];

    const CANDIDATES = ["Aramis Stilton", "Artorias", "Omar Ashour", "Satoshi Nakamoto"];

    beforeEach(async () => {
        // Perform setup for each test
        VoteContractFactory = await ethers.getContractFactory("VoteContract");
        VoteContract = await VoteContractFactory.deploy(CANDIDATES);
        [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
        VoteContract.enrollVoters([addr1.address, addr2.address]);
    });

    describe("Deployment", () => {

        it("Should have the correct candidates deployed", async () => {
            expect(await VoteContract.viewCandidates()).to.deep.equal(CANDIDATES);
        });
        
        it("Should have the correct owner address", async () => {
            expect(await VoteContract.owner()).to.equal(owner.address);
        });

        it("Should have candidates vote count initialized to 0", async () => {
            for (let candidate of CANDIDATES) {
                expect(await VoteContract.viewCandidateVotes(candidate)).to.equal(0);
            }
        });
    });

    describe("OnlyOwner Protected Methods", () => {

        it("Set candidates should fail if called by non owner", async () => {
            // Test array of candidates, this should fail
            const newCandidates = ["Michelle", "Andreas"];
            await expect(VoteContract.connect(addr1).setCandidates(newCandidates))
                .to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Voting Tests", () => {
        it("Voter voting status should be mapped to true", async () => {
            expect(await VoteContract.checkVotingStatus(addr1.address)).to.be.true;
            expect(await VoteContract.checkVotingStatus(addr2.address)).to.be.true;
        });

        it("Vote count for candidate should increase by 1 after voting", async () => {
            const candidate = "Aramis Stilton";
            const currentVoteCount = await VoteContract.viewCandidateVotes(candidate);
            await VoteContract.connect(addr1).vote(candidate);
            expect(await VoteContract.viewCandidateVotes(candidate)).to.equal(currentVoteCount + 1);
        });

        it("Voting for a candidate should not affect vote counts of others", async () => {
            const candidate = "Aramis Stilton";
            await VoteContract.connect(addr1).vote(candidate);
            const otherCandidates = [...CANDIDATES];
            otherCandidates.shift();
            for (let otherCandidate in otherCandidates) {
                expect(await VoteContract.viewCandidateVotes(otherCandidate)).to.equal(0);
            }
        })

        it("Voters should not be able to vote more than once", async () => {
            const candidate = "Artorias";
            await VoteContract.connect(addr1).vote(candidate);
            await expect(VoteContract.connect(addr1).vote(candidate)).to.be.reverted;
        });

        it("Unregistered voters should not be able to vote", async () => {
            const candidate = "Omar Ashour";
            await expect(VoteContract.connect(addr3).vote(candidate)).to.be.reverted;
        });

        it("Voters should not be able to vote for non-existent candidate", async () => {
            const candidate = "adjwaidwa";
            await expect(VoteContract.connect(addr1).vote(candidate)).to.be.reverted;
        });
    });
});
