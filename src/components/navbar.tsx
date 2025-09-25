import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  return (
    <div className="flex justify-end items-center p-4 bg-blue-500 text-white">
      <nav className="navbar">
        {!isLoggedIn ? (
          <ul className="flex space-x-6">
            <li>
              <Link to='/home' className="hover:underline">Home</Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-6">
            <li>
              <Link to="/home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/event-management" className="hover:underline">
                Event Management
              </Link>
            </li>
            <li>
              <Link to="/volunteer-matching" className="hover:underline">
                Volunteer Matching
              </Link>
            </li>
            <li>
              <Link to="/volunteer-history" className="hover:underline">
                Volunteer History
              </Link>
            </li>
            <li>
              <Link to="/notifications" className="hover:underline">
                Notifications
              </Link>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
