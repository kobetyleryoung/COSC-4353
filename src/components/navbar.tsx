import {Link} from 'react-router-dom'

interface NavbarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const Navbar = ({isLoggedIn, onLogout}:NavbarProps) => {
  return (
    <div className='navbar-brand'>
      <nav className="navbar">
        {!isLoggedIn ?(
            <li><Link to='/login'>Login</Link></li>
        ):(
            <ul className='navbar-links'>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/event management">Event Management</Link></li>
            <li><Link to="/volunteer matching">Volunteer Matching</Link></li>
            <li><Link to="/volunteer history">Volunteer History</Link></li>
            <li><button onClick={onLogout}>Logout</button></li>
        </ul>
        )}
      </nav>  
    </div>
  
    )
}
export default Navbar