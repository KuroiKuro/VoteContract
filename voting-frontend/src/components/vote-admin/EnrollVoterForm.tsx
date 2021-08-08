import { useState } from 'react'


const EnrollVoterForm: React.FC = () => {
    const [address, setAddress] = useState("");

    return (
        <div>
            <form>
                <label>Voter Address</label>
                <input value={address} onChange={(event) => setAddress(event.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export { EnrollVoterForm };
