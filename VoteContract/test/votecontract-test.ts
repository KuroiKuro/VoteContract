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
        it("Voters in voterRoll should be mapped to false", async () => {
            expect(await VoteContract.checkVoteStatus(addr1.address)).to.be.false;
            expect(await VoteContract.checkVoteStatus(addr2.address)).to.be.false;
            expect(await VoteContract.checkVoteStatus(addr3.address)).to.be.false;
        });

        it("Vote count for candidate should increase by 1 after voting", async () => {
            const candidate = "Aramis Stilton"
            const currentVoteCount = await VoteContract.viewCandidateVotes(candidate);
            await VoteContract.connect(addr1).vote(candidate);
            expect(await VoteContract.viewCandidateVotes(candidate)).to.equal(currentVoteCount + 1);
        });
    });
});
