import Logo from '../../assest/logo.png';
import ProfileIcon from '../../assest/profile.png';

const Navbar = () => {

    return (
        <div className="navbar">
            <div>
                <img src={Logo} width="70" />
            </div>
            <div className='profile-wrapper'>
                <img src={ProfileIcon} width="50" />
                <p>User Profile</p>
            </div>
        </div>
    )
}

export default Navbar;
