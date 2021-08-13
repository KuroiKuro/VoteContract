import { ethers } from 'ethers';
import fs from 'fs';
import VoteContract from '@contracts/VoteContract.sol/VoteContract.json';

// Declare global to extend Window object globally. We want to tell typescript
// that window.ethereum exists, since metamask injects it
declare global {
    interface Window {
        ethereum?: any
    }
}

export const getContractAddress = (addressFilePath: string) => {
    // Read contract address that is saved inside addressFile
    return fs.readFileSync(addressFilePath, "utf8");
}


export const CONTRACT_ADDRESS_FILE_PATH = "../../../VoteContract/contract-address.txt";
export const CONTRACT_ADDRESS = getContractAddress(CONTRACT_ADDRESS_FILE_PATH);


export const getContractObject = (): ethers.Contract => {
    // Utility function to create a Contract object
    if (!window.ethereum) throw new Error("Metamask not installed");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new ethers.Contract(CONTRACT_ADDRESS, VoteContract.abi, provider);
}


export const enrollVoters = async (voterAddresses: string[]) => {
    // Call the smart contract method to enroll voters
    const contract = getContractObject();
    try {
        await contract.enrollVoters(voterAddresses);
    } catch (err) {
        console.log(`Error when enrolling voters: ${err}`);
    }
}
