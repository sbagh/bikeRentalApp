import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReserveBike from "./pages/ReserveBike";
import Navbar from "./components/Navbar";
import ReturnBike from "./pages/ReturnBike";
import CustomerComplaints from "./pages/CustomerComplaints";
import { useState } from "react";
import AdminComplaints from "./pages/AdminComplaints";
import BikeInventory from "./pages/BikeInventory";

function App() {
   // user is an obj with an id and name property
   const [user, setUser] = useState({ id: 1, name: "Customer" });
   const users = [
      { id: 1, name: "Customer" },
      { id: 2, name: "Admin" },
   ];
   return (
      <div>
         <Navbar setUser={setUser} user={user} users={users} />
         <Routes>
            <Route path="/" element={<Home props={user} />} />
            <Route path="/ReserveBike" element={<ReserveBike user={user} />} />
            <Route path="/ReturnBike" element={<ReturnBike />} />
            <Route
               path="/CustomerComplaints"
               element={<CustomerComplaints />}
            />
            <Route path="/AdminComplaints" element={<AdminComplaints />} />
            <Route path="/BikeInventory" element={<BikeInventory />} />
         </Routes>
      </div>
   );
}

export default App;
