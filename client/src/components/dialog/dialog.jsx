import { useState } from "react";

const Dialog = ({id, text, onClosePopup, getBikesLocation}) => {

    const [ reports , setReports ] = useState('');
    const [ returnedLocation , setReturnedLocation ] = useState('');

    const handleChange = (e, set) => {
        set(e.target.value);
    }

    const confirmPopup = () => {
        const payload = !!returnedLocation ? returnedLocation : reports; // == returnedLocation ? returnedLocation : reports;
        onClosePopup(false, payload);
    }

    return (
        <div className='popup'>
            <div className='popup_inner'>
                <h1>{text}</h1>
                {
                    getBikesLocation &&
                    <select className="city-dropdown" onChange={e => handleChange(e, setReturnedLocation)}>
                        <option disabled selected>Please select the return location</option>
                        { getBikesLocation.sort((a, b) => {
                                // Sort the cities alphabetically
                                return a.location.localeCompare(b.location);
                             }).map((bikeLocation, i) => {
                            const location = bikeLocation.location;
                            return <option key={i} value={location}>{location}</option>
                        })}
                    </select>
                }
                {
                    !getBikesLocation &&
                    <input placeholder="Please fill your report ex: lost or describe the demage" value={reports} onChange={e => handleChange(e, setReports)} />
                }
                <div className="btn-container">
                    <button className="btn report-button" onClick={() => onClosePopup(true)}>Close</button>
                    <button className="btn pick-and-return-button" disabled={!returnedLocation && !reports} onClick={() => confirmPopup(id)}>Confirm</button>
                </div>
            </div>
        </div>
    )
}
export default Dialog;