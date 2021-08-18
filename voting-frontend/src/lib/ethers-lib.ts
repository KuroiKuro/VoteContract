import { ethers } from 'ethers';
import VoteContract from 'contracts/VoteContract.json';

// Declare global to extend Window object globally. We want to tell typescript
// that window.ethereum exists, since metamask injects it
declare global {
    interface Window {
        ethereum?: any
    }
}

export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


// Utility functions to easily retrieve objects and classes needed to call
// smart contract methods

export const getProvider = (): ethers.providers.Web3Provider => {
    if (!window.ethereum) throw new Error("Metamask not installed");
    return new ethers.providers.Web3Provider(window.ethereum);
}

export const getContractObject = (): ethers.Contract => {
    // Utility function to create a Contract object
    const provider = getProvider();
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, VoteContract.abi, signer);
}


export const enrollVoters = async (voterAddresses: string[]) => {
    // Call the smart contract method to enroll voters
    const contract = getContractObject();
    try {
        const transaction = await contract.enrollVoters(voterAddresses);
        await transaction.wait();
    } catch (err) {
        console.log(`Error when enrolling voters: ${err}`);
    }
}

export const checkVoterEnrollment = async (voterAddress: string): Promise<boolean> => {
    const contract = getContractObject();
    try {
        const enrollmentValidity: boolean = await contract.checkVoterEnrollment(voterAddress);
        console.log(enrollmentValidity);
        return enrollmentValidity;
    } catch (error) {
        console.log("Error checking status");
        return false;
    }
}
