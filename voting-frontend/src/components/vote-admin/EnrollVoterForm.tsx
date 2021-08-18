import { useState } from 'react'
import { enrollVoters } from 'lib/voter-admin-lib'


const EnrollVoterForm: React.FC = () => {
    const [addresses, setAddresses] = useState<string[]>([""]);

    // Create array of address input elements for user to input multiple
    // addresses
    const addressElems = addresses.map((_address, index) => {
        return (
            <div key={index}>
                <label>Voter Address {index + 1}</label>
                <input
                    value={addresses[index]}
                    onChange={event => {
                        const newAddresses = [...addresses];
                        newAddresses[index] = event.target.value;
                        setAddresses(newAddresses);
                    }}
                />
            </div>
        );
    });

    return (
        <div>
            <button
                onClick={() => setAddresses(addresses => [...addresses, ""])}
            >
                Add Address
            </button>
            <button
                onClick={() => setAddresses(addresses => {
                    const newAddresses = [...addresses];
                    newAddresses.pop();
                    return newAddresses;
                })}
                disabled={addresses.length <= 1}
            >
                Remove address
            </button>
            <form>
            {addressElems}
            <button
                onClick={(event) => {
                    event.preventDefault();
                    // TODO: implement a custom error class for missing
                    // metamask and add handling for it here
                    enrollVoters(addresses)
                        .then(() => console.log("Addresses enrolled"))
                        .catch(err => console.log(err));
                }}
            >
                Submit
            </button>
            </form>
        </div>
    );
}

export { EnrollVoterForm };
