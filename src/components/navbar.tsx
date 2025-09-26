import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  return (
    <div className="bg-white/25 backdrop-blur-lg border-y border-white/20 shadow-lg mb-6">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        {!isLoggedIn ? (
          <div className="flex justify-center space-x-8">
            <Link 
              to='/home' 
              className="text-white font-medium hover:underline transition-all duration-200 px-4 py-2"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-white font-medium hover:underline transition-all duration-200 px-4 py-2"
            >
              About
            </Link>
            <Link 
              to="/login" 
              className="text-white font-medium hover:underline transition-all duration-200 px-4 py-2"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-6">
            <Link 
              to="/home" 
              className="text-white font-medium hover:underline transition-all duration-200 px-3 py-2"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-white font-medium hover:underline transition-all duration-200 px-3 py-2"
            >
              About
            </Link>
            <Link 
              to="/profile" 
              className="text-white font-medium hover:underline transition-all duration-200 px-3 py-2"
            >
              Profile
            </Link>
            <Link 
              to="/event-management" 
              className="text-white font-medium hover:underline transition-all duration-200 px-3 py-2"
            >
              Event Management
            </Link>
            <Link 
              to="/volunteer-matching" 
              className="text-white font-medium hover:underline transition-all duration-200 px-3 py-2"
            >
              Volunteer Matching
            </Link>
            <Link 
              to="/volunteer-history" 
              className="text-white font-medium hover:underline transition-all duration-200 px-3 py-2"
            >
              Volunteer History
            </Link>
            <Link 
              to="/notifications" 
              className="text-white font-medium hover:underline transition-all duration-200 px-3 py-2"
            >
              Notifications
            </Link>
            <button
              onClick={onLogout}
              className="bg-red-500/80 hover:bg-red-600/90 backdrop-blur-sm text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
