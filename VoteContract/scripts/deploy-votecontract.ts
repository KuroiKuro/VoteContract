import hre from 'hardhat';
import fs from 'fs'

const CANDIDATES = ["Ornstein", "Smough", "Gundyr"];

const main = async () => {
    const VoteContractFactory = await hre.ethers.getContractFactory("VoteContract");
    // Contract takes an array of candidates as the constructor
    const VoteContract = await VoteContractFactory.deploy(CANDIDATES);

    await VoteContract.deployed();

    // Would be cool if I can set an environment variable here that
    // the frontend can access using process.env
    const contractAddress = VoteContract.address;
    console.log("VoteContract deployed to:", contractAddress);
    fs.writeFileSync("./contract-address.txt", contractAddress);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
