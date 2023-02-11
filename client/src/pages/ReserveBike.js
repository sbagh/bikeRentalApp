import { useState, useEffect } from "react";
import ReserveBikeForm from "../components/ReserveBikeForm";
import { bikesData } from "../assets/bikes";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function ReserveBike({ user }) {
   const [reservationDetails, setReservationDetails] = useState({
      pickupLocation: "",
      reservationID: "",
      Bike: {},
   });

   // function to hanlde changes in the form
   const handleChange = (e) => {
      setReservationDetails({
         ...reservationDetails,
         [e.target.name]: e.target.value,
      });
   };

   // function to handle submit button on form
   const onSubmit = (e) => {
      // Generate a reservation id
      const reservationID = uuidv4();

      // Select a bike from the bikes data, based on user's preferred location
      const selectedBike = bikesData.find(
         (bike) =>
            bike.location === reservationDetails.pickupLocation &&
            bike.available
      );

      // create an object to store the updated reservation details
      const updatedReservationDetails = {
         ...reservationDetails,
         reservationID,
         Bike: selectedBike,
      };

      //set the reservationDetails state to the udpated reservation details
      setReservationDetails(updatedReservationDetails);
   };

   // function to send reservation details along with user to the back-end server.js file
   const sendBikeReservation = async () => {
      try {
         await axios.post("http://localhost:4200/sendBikeReservation", {
            user,
            reservationDetails,
         });
      } catch (error) {
         console.log(error);
      }
   };

   // use effect to run the sendBikeReservation function whenever whenever the user clicks submit and all reservationDetails keys are not empty
   useEffect(() => {
      if (
         Object.keys(reservationDetails.Bike).length !== 0 &&
         Object.keys(reservationDetails.reservationID).length !== 0 &&
         Object.keys(reservationDetails.pickupLocation).length !== 0
      ) {
         sendBikeReservation();
         console.log("reservation sent: ", reservationDetails);
      }
   }, [onSubmit]);

   return (
      <div className="reserve-bike">
         <h1 className="title">Reserve a bike</h1>
         <ReserveBikeForm
            bikesData={bikesData}
            handleChange={handleChange}
            reservationDetails={reservationDetails}
            onSubmit={onSubmit}
         />
      </div>
   );
}
