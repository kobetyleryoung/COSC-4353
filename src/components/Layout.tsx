import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout = ({ children, isLoggedIn, onLogout }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      {/* Glass Morphism Header - Blends beautifully with gradient */}
      <header className="bg-white/20 backdrop-blur-md border-b border-white/30 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold drop-shadow-sm">Volunteer Management</h1>
      </header>

      {/* Integrated Navbar - Directly connected to header */}
      <nav className="bg-white/25 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {!isLoggedIn ? (
            <div className="flex justify-center space-x-8">
              <Link 
                to='/home' 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                About
              </Link>
              <Link 
                to="/login" 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center space-x-6">
              <Link 
                to="/home" 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                About
              </Link>
              <Link 
                to="/profile" 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Profile
              </Link>
              <Link 
                to="/event-management" 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Event Management
              </Link>
              <Link 
                to="/volunteer-matching" 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Volunteer Matching
              </Link>
              <Link 
                to="/volunteer-history" 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Volunteer History
              </Link>
              <Link 
                to="/notifications" 
                className="text-white font-medium hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
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
        </div>
      </nav>

      {/* Main content with subtle background */}
      <main className="flex-grow p-6 bg-white/10 backdrop-blur-sm">{children}</main>

      {/* Glass Morphism Footer */}
      <footer className="bg-white/15 backdrop-blur-md border-t border-white/20 text-white p-4 text-center shadow-lg">
        <span className="drop-shadow-sm">© 2025 Non-Profit Organization :)</span>
      </footer>
    </div>
  );
};

export default Layout;
