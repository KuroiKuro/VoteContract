import { useState, useEffect } from 'react'
import { getCandidates, voteCandidate } from 'lib/voter-lib'

export const VoteCandidateForm: React.FC = () => {
    const [candidateList, setCandidateList] = useState<string[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState("");

    useEffect(() => {
        getCandidates()
            .then(candidates => setCandidateList(candidates))
            .catch(error => console.log(error));
    });

    const options = candidateList.map((candidate, index) => {
        return (
            <option
                key={index}
                onClick={() => setSelectedCandidate(candidate)}
            >
                {candidate}
            </option>
        );
    });

    return (
        <form>
            <select>
                {options}
            </select>
            <button
                type="button"
                onClick={() => {
                    voteCandidate(selectedCandidate)
                        .then(() => console.log("Vote successful"))
                        .catch(error => console.log(error));
                }}
            >
                Vote!
            </button>
        </form>
    );
}
