import { useEffect, useState } from "react";
import { getAllBikes } from "../../api/index";

const AdminPage = () => {
   const [bikes, setBikes] = useState([]);
   useEffect(() => {
      getAllBikes()
         .then((value) => value.data)
         .then((val) => {
            setBikes(val.data);
         })
         .finally();
   }, [bikes]);

   const reservationStatusLogic = (bikeReservationStatus) => {
      if (!bikeReservationStatus) {
         return "available";
      } else {
         return "bike reserved";
      }
   };

   const displayReports = (bikeReportsArray) => {
      if (!bikeReportsArray.length) {
         return "no reports";
      }
   };

   return (
      <>
         <div className="main-container">
            <table className="bike-table">
               <caption>Bike Inventory</caption>

               <thead>
                  <tr>
                     <th>bike ID</th>
                     <th>Location</th>
                     <th>Reservation status</th>
                     <th>Reports</th>
                  </tr>
               </thead>
               <tbody>
                  {" "}
                  {bikes.map((bike, i) => (
                     <tr key={i}>
                        <th>{bike._id}</th>
                        <th>{bike.bikeLocation}</th>
                        <th>
                           {reservationStatusLogic(bike.reservationStatus)}
                        </th>
                        <th>{displayReports(bike.reports)}</th>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default AdminPage;
