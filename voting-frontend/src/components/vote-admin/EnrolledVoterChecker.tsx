import { useState } from 'react'
import { checkVoterEnrollment } from 'lib/voter-admin-lib'

export const EnrolledVoterChecker: React.FC = () => {
    const [address, setAddress] = useState("");
    const [valid, setValid] = useState<boolean | null>(null);

    const message = valid === null ? "" : `Voter is enrolled: ${valid}`;

    return (
        <form>
            <label>Voter Address</label>
            <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
            />
            <p>{message}</p>
            <button
                type="button"
                onClick={(event) => {
                    checkVoterEnrollment(address)
                        .then(validity => setValid(validity))
                        .catch(error => console.log(error));
                }}
            >
                Check
            </button>
        </form>
    );
}
