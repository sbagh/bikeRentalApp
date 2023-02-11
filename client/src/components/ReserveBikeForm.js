import React from "react";

const ReserveBikeForm = ({
   bikesData,
   handleChange,
   reservationDetails,
   onSubmit,
}) => {
   //1 - Create a new array containing the location names from the bikesData array using .map
   //2 - Filter that array to only contain unique locations (i.e remove repeated locations)
   // in summary, locationOptions is an array of unique location names from the bikesData array:

   const locationOptions = bikesData
      .map((bike) => bike.location)
      .filter((location, index, self) => self.indexOf(location) === index);

   return (
      <form onSubmit={onSubmit} className="reserve-bike-form">
         <label>
            Select a location:
            <select
               name="pickupLocation"
               value={reservationDetails.pickupLocation}
               onChange={handleChange}
            >
               <option value=""> Please choose a location </option>
               {locationOptions.map((location) => (
                  <option key={location} value={location}>
                     {location}
                  </option>
               ))}
            </select>
         </label>
         <button type="submit">Reserve Bike</button>
      </form>
   );
};

export default ReserveBikeForm;
