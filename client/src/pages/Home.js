import AdminHomePage from "../components/AdminHomePage";
import CustomerHomePage from "../components/CustomerHomePage";

export default function Home({ props }) {
  return (
    <div>
      {props.name === "Admin" ? <AdminHomePage /> : <CustomerHomePage />}
    </div>
  );
}
