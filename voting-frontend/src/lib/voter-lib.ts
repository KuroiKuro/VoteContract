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
    } catch (err) {
        console.log(`Error when retrieving candidate list: ${err}`);
        throw err;
    }
}
