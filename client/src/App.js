import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import AdminPage from "./pages/admin/admin-page";
import UsersPage from "./pages/users/users-page";

function App() {
  return (
    <>
      <div className="app-container">
      <Navbar /> 
        <div className="outlet-container">
          <Routes>
            <Route path="/user-dashboard" element={<UsersPage />} />
            <Route path="/admin-dashboard" element={<AdminPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
