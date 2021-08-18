import { getContractObject } from 'lib/ethers-lib';


export const enrollVoters = async (voterAddresses: string[]) => {
    // Call the smart contract method to enroll voters
    const contract = getContractObject();
    try {
        const transaction = await contract.enrollVoters(voterAddresses);
        await transaction.wait();
    } catch (err) {
        console.log(`Error when enrolling voters: ${err}`);
        throw err;
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
