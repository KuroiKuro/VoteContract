import { getContractObject } from 'lib/ethers-lib';


export const getCandidates = async (): Promise<string[]> => {
    const contract = getContractObject();
    try {
        const candidates: string[] = await contract.viewCandidates();
        return candidates
    } catch (error) {
        console.log(`Error when retrieving candidate list: ${error}`);
        throw error;
    }
}

export const voteCandidate = async (candidate: string): Promise<boolean> => {
    const contract = getContractObject();
    try {
        await contract.vote(candidate);
        return true;
    } catch (error) {
        console.log(`Error when voting for candidate ${candidate}`);
        throw error;
    }
}
