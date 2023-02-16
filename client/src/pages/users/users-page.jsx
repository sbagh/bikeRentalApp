import { useEffect, useState } from "react";
import { getAllBikes, getBikeById, updateBikeById } from "../../api/index";
import uuid from "react-uuid";
import bikeImg from "../../assest/bike.png";

const UsersPage = () => {
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);

  const [isPicked, setIsPicked] = useState(false);

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

  bikes.forEach((bike) => {
    // to check if the address is exist by returning a Boolean
    const addressExist = getBikesLocation.some(
      (b) => b.location === bike.bikeLocation
    );

    if (addressExist) {
      getBikesLocation.filter((bikesLocation) => {
        if (bikesLocation.location === bike.bikeLocation) {
          return bikesLocation.count++;
        }
      });
    }
  });
  const handleSelect = (e) => {
    const selectedLocation = e.target.value;
    const bikesByLocation = bikes.filter(
      (bike) => bike.bikeLocation === selectedLocation
    );
    const randomBike =
      bikesByLocation[Math.floor(Math.random() * bikesByLocation.length)];
    setSelectedBike(randomBike);
  };

  const reserveBike = async (id) => {
    const createReservationId = uuid();
    const generateCustomerId = uuid();
    setIsPicked(true);
    const body = {
      customerId: generateCustomerId,
      bikeLocation: selectedBike.bikeLocation,
      reservationStatus: true,
      reservationId: createReservationId,
    };
    await updateBikeById(id, body);
    // To get the reservationId for the selected bike
    await getBikeById(id)
      .then((value) => {
        return value.data;
      })
      .then((val) => setSelectedBike(val.data));
  };

  const returnBike = async (returnedLocation) => {
    const body = {
      customerId: null,
      bikeLocation: returnedLocation,
      reservationStatus: false,
      reservationId: null,
    };
    await updateBikeById(selectedBike._id, body).then((val) => {
      setIsPicked(false);
      setSelectedBike(null);
    });
  };

  let dashboardButtons;

  dashboardButtons = isPicked ? (
    <>
      <button className="btn report-button">Report</button>
      <button className="btn pick-and-return-button">Return</button>
    </>
  ) : (
    <button
      className="btn pick-and-return-button"
      onClick={() => reserveBike(selectedBike._id)}>
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
            onChange={handleSelect}>
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
                      <option
                        key={i}
                        value={location}
                        disabled={!inventoryCounts}>
                        {location} - available bikes: {inventoryCounts}
                      </option>
                    )}
                    {!inventoryCounts && (
                      <option
                        key={i}
                        value={location}
                        disabled={!inventoryCounts}>
                        {location} - There is no available bikes here
                      </option>
                    )}
                  </>
                );
              })}
          </select>
        </div>

        {selectedBike && (
          <div className="details-wrapper">
            <img src={bikeImg} width="200" height="200" alt="bike photo" />
            <div className="bike-details">
              <h2>Bike details</h2>
              <h3>Bike Id: {selectedBike._id}</h3>
              {!!isPicked && (
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

              <div className="btn-container">{dashboardButtons}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersPage;
