import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar";
import Login from "./pages/Authentication/login";
import Signup from "./pages/Authentication/signup";
import User_Profile_Management from "./pages/Profile/User_Profile_Management";
import Management from "./pages/Admins/Event_Management_Form";
import Volunteer_Match_Form from "./pages/Admins/Volunteer_Match_Form";
import VolunteerHistory from "./pages/Profile/volunteer_history";
import Home_page from "./pages/Home_page";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleSignup = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />
        
        {/* Public routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/profile" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/profile" replace /> : <Signup onSignup={handleSignup} />}
        />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <User_Profile_Management />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event management"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Management />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer matching"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Volunteer_Match_Form />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer history"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <VolunteerHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
