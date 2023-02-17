import { useEffect, useState } from "react";
import { getAllBikes, getBikeById, updateBikeById } from "../../api/index";
import uuid from "react-uuid";
import bikeImg from "../../assest/bike.png";
import Dialog from "../../components/dialog/dialog";

const UsersPage = () => {
   //  store bikes in a state as an array
   const [bikes, setBikes] = useState([]);
   // store selected bike in a object state
   const [selectedBike, setSelectedBike] = useState(null);
   // boolean to store whether bike is selected or not
   const [isPicked, setIsPicked] = useState(false);

   // to show /hide dialogs
   const [openReturnDialog, setOpenReturnDialog] = useState(false);
   const [openReportDialog, setOpenReportDialog] = useState(false);

   useEffect(() => {
      getAllBikes()
         .then((value) => value.data)
         .then((val) => setBikes(val.data))
         .finally();
   }, [bikes]);

   const getBikesLocation = [
      { location: "Anjou", count: 0 },
      { location: "Downtown", count: 0 },
      { location: "Mont Royal", count: 0 },
      { location: "Laval", count: 0 },
      { location: "Longueuil", count: 0 },
      { location: "Sherbrook", count: 0 },
      { location: "St-Laurant", count: 0 },
      { location: "Point-claire", count: 0 },
   ];

   // add a callback for each bike
   bikes.forEach((bike) => {
      getBikesLocation.filter((bikesLocation) => {
         if (bikesLocation.location === bike.bikeLocation) {
            return bikesLocation.count++;
         }
      });
   });

   // assign a random bike from the selected location
   const handleSelect = (e) => {
      const selectedLocation = e.target.value;
      const bikesByLocation = bikes.filter(
         (bike) => bike.bikeLocation === selectedLocation
      );
      const randomBike =
         bikesByLocation[Math.floor(Math.random() * bikesByLocation.length)];
      setSelectedBike(randomBike);
   };

   // send reserveBike details to mongoDB
   const reserveBike = async (id) => {
      // generate a random ID for reservation and customer
      const createReservationId = uuid();
      const generateCustomerId = uuid();
      setIsPicked(true);
      // payload to send
      const body = {
         ...selectedBike,
         customerId: generateCustomerId,
         bikeLocation: selectedBike.bikeLocation,
         reservationStatus: true,
         reservationId: createReservationId,
      };
      // send the payload to update the bike details in mongoDB
      await updateBikeById(id, body);

      // To get the reservationId for the selected bike
      await getBikeById(id)
         .then((value) => {
            return value.data;
         })
         .then((val) => setSelectedBike(val.data));
   };

   // return bike to a selected location
   const returnBike = async (returnedLocation) => {
      const body = {
         ...selectedBike,
         customerId: null,
         bikeLocation: returnedLocation,
         reservationStatus: false,
         reservationId: null,
      };
      await updateBikeById(selectedBike._id, body).then((val) => {
         setOpenReturnDialog(false);
         setIsPicked(false);
         setSelectedBike(null);
      });
   };

   const reportBike = async (newReport) => {
      selectedBike.reports.push(newReport);
      const body = {
         ...selectedBike,
         bikeLocation: selectedBike.bikeLocation, // required
         reservationStatus: selectedBike.reservationStatus, // required
         reports: selectedBike.reports,
      };
      await updateBikeById(selectedBike._id, body).then((val) => {
         setOpenReportDialog(false);
      });
      await getBikeById(selectedBike._id)
         .then((value) => {
            return value.data;
         })
         .then((val) => setSelectedBike(val.data));
   };

   // reusable function for Report and Return dialogues
   const openDialog = (dialog) => {
      dialog(true);
   };

   const closeDialog = (dialog) => {
      dialog(false);
   };

   const dashboardButtons = isPicked ? (
      <>
         <button
            className="btn report-button"
            onClick={() => openDialog(setOpenReportDialog)}
         >
            Report
         </button>
         <button
            className="btn pick-and-return-button"
            onClick={() => openDialog(setOpenReturnDialog)}
         >
            Return
         </button>
      </>
   ) : (
      <button
         className="btn pick-and-return-button"
         onClick={() => reserveBike(selectedBike._id)}
      >
         Pick it up
      </button>
   );

   return (
      <>
         <div className="main-container">
            <div className="search-bar">
               <h2>Looking for a trip?</h2>
               <select
                  disabled={isPicked}
                  className="city-dropdown"
                  onChange={handleSelect}
               >
                  <option value={null} disabled selected>
                     Please select the location
                  </option>
                  {getBikesLocation
                     .sort((a, b) => {
                        // Sort the cities alphabetically
                        return a.location.localeCompare(b.location);
                     })
                     .map((bikeLocation, i) => {
                        const location = bikeLocation.location;
                        const inventoryCounts = bikeLocation.count;

                        return (
                           <>
                              {inventoryCounts && (
                                 <option key={i} value={location}>
                                    {location} - available bikes:{" "}
                                    {inventoryCounts}
                                 </option>
                              )}
                              {!inventoryCounts && (
                                 <option key={i} value={location} disabled>
                                    {location} - There is no available bikes
                                    here
                                 </option>
                              )}
                           </>
                        );
                     })}
               </select>
            </div>

            {selectedBike && (
               <div className="details-wrapper">
                  <img src={bikeImg} width="200" height="200" alt="bike" />
                  <div className="bike-details">
                     <h2>Bike details</h2>
                     <h3>Bike Id: {selectedBike._id}</h3>
                     {isPicked && (
                        <>
                           <h3>Reservation Id: </h3>
                           <p>{selectedBike.reservationId}</p>
                        </>
                     )}
                     <h3>Location: {selectedBike.bikeLocation}</h3>
                     {selectedBike.reports.length >= 1 && (
                        <>
                           <h3>Reports: </h3>
                           <ul>
                              {selectedBike.reports.map((report, i) => {
                                 if (!!report) return <li key={i}>{report}</li>;
                              })}
                           </ul>
                        </>
                     )}

                     {openReturnDialog && (
                        <Dialog
                           id={selectedBike._id}
                           text={"Return the bike"}
                           onClosePopup={(boolean, returnedLocation) =>
                              boolean
                                 ? closeDialog(setOpenReturnDialog)
                                 : returnBike(returnedLocation)
                           }
                           getBikesLocation={getBikesLocation}
                        />
                     )}

                     {openReportDialog && (
                        <Dialog
                           id={selectedBike._id}
                           text={"Report the bike"}
                           onClosePopup={(boolean, report) =>
                              boolean
                                 ? closeDialog(setOpenReportDialog)
                                 : reportBike(report)
                           }
                        />
                     )}

                     <div className="btn-container">{dashboardButtons}</div>
                  </div>
               </div>
            )}
         </div>
      </>
   );
};

export default UsersPage;
