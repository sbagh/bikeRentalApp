import Logo from "../../assest/logo.png";
import ProfileIcon from "../../assest/profile.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="/">
        <img src={Logo} width="70" />
      </a>

      <a href="/admin" className="profile-wrapper">
        <img src={ProfileIcon} width="50" />
        <p>Admin Profile</p>
      </a>
    </div>
  );
};

export default Navbar;
