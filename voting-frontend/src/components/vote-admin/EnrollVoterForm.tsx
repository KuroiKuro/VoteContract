import { useState } from 'react'
import { enrollVoters } from 'lib/ethers-lib'


const EnrollVoterForm: React.FC = () => {
    const [addresses, setAddresses] = useState<string[]>([""]);

    // Create array of address input elements for user to input multiple
    // addresses
    const addressElems = addresses.map((address, index) => {
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
                onClick={() => {
                    try {
                        enrollVoters(addresses);
                    } catch (error) {
                        // TODO: implement a custom error class for missing
                        // metamask and add handling for it here
                        console.log(error);
                    }
                }}
            >
                Submit
            </button>
            </form>
        </div>
    );
}

export { EnrollVoterForm };
