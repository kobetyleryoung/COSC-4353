
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from "./pages/Authentication/User_Authentication_page";
import User_Profile_Management from "./pages/Profile/User_Profile_Management";
import Management from './pages/Admins/Event_Management_Form';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }
return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/profile" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/profile" element={<User_Profile_Management/>} />
          <Route path="/event_management" element={<Management/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
