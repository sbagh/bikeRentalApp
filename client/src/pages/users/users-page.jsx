import { useEffect, useState } from "react";
import { getAllBikes } from "../../api/index";

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
      </div>
    </>
  );
};

export default UsersPage;
