import hre from 'hardhat';

const CANDIDATES = ["Ornstein", "Smough", "Gundyr"];

const main = async () => {
    const VoteContractFactory = await hre.ethers.getContractFactory("VoteContract");
    // Contract takes an array of candidates as the constructor
    const VoteContract = await VoteContractFactory.deploy(CANDIDATES);

    await VoteContract.deployed();

    // Would be cool if I can set an environment variable here that
    // the frontend can access using process.env
    console.log("VoteContract deployed to:", VoteContract.address);
}
