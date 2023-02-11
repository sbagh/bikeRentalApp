import { Link } from "react-router-dom";

export default function Navbar({ setUser, user, users }) {
  // function to get the opposite of current user.name .. so if user.name = "admin" -> inverseUserName will return "customer"
  function inverseUserName(name) {
    if (name === "Customer") {
      return "Admin";
    } else {
      return "Customer";
    }
  }
  // when button is clicked
  const handleUserChange = (event) => {
    // get the opposite of current user and set is as updatedUserName
    let updatedUserName = inverseUserName(user.name);

    // find the corresponding user from the users array
    let updatedUser = users.find((user) => user.name === updatedUserName);

    //set it to the new user
    setUser(updatedUser);

    console.log("updatedUserName: ", updatedUserName);
    console.log("user.name: ", user.name);
  };

  // setting the updatedUserName outside block to render in button
  let updatedUserName = inverseUserName(user.name);

  return (
    <div>
      {user.name === "Customer" ? (
        <div className="customer-navbar">
          <Link to="/">Customer Reservations</Link>
          <Link to="/ReserveBike">Reserve Bike</Link>
          <Link to="/CustomerComplaints">Complaints</Link>
          <Link to="/Checkout">Pickup Bike</Link>
          <Link to="/ReturnBike">Return Bike</Link>
          <div className="change-user-button">
            <button onClick={handleUserChange} value={updatedUserName}>
              {updatedUserName}
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-navbar">
          <Link to="/BikeInventory">Bike Inventory</Link>
          <div className="change-user-button">
            <button onClick={handleUserChange} value={updatedUserName}>
              {updatedUserName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
