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
      } else {
         return (
            <ul>
               {bikeReportsArray.map((report) => (
                  <li>{report}</li>
               ))}
            </ul>
         );
      }
   };

   return (
      <div className="main-container">
         <div className="bike-table-container">
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
                        <td>{bike._id}</td>
                        <td>{bike.bikeLocation}</td>
                        <td>
                           {reservationStatusLogic(bike.reservationStatus)}
                        </td>
                        <td>{displayReports(bike.reports)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AdminPage;
