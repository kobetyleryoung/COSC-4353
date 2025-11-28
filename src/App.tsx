import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css"
import User_Profile_Management from "./pages/Profile/User_Profile_Management";
import Management from "./pages/Admins/Event_Management_Form";
import Volunteer_Match_Form from "./pages/Admins/Volunteer_Match_Form";
import VolunteerHistory from "./pages/Profile/volunteer_history";
import Layout from "./components/Layout";
import Home_page from "./pages/Home_page";
import About from "./pages/About";
import Notifications from "./pages/Admins/notification";
import ReportsPage from './pages/Admins/volunteer_activities_report'
import { createOrGetUser } from "./components/api/users";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, isLoading, logout, user } = useAuth0();
  useEffect(() => {
    if(isAuthenticated && user) {
      createOrGetUser({
        email: user.email!, 
        display_name:user.name || user.email!.split('@')[0],
        auth0_sub: user.sub!
      }).catch((err) => {
        console.error("Error creating/getting user:", err);
      });
      
      }
  }, [user, isAuthenticated]);

  const handleLogout = () => {
    localStorage.clear();
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Layout isLoggedIn={isAuthenticated} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home_page />} />
          <Route path="/about" element={<About />} />
         
          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <User_Profile_Management />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/event-management"
            element={
              <ProtectedRoutes>
                <Management />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/volunteer-matching"
            element={
              <ProtectedRoutes>
                <Volunteer_Match_Form />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/volunteer-history"
            element={
              <ProtectedRoutes>
                <VolunteerHistory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoutes>
                <Notifications />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoutes>
                <ReportsPage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;