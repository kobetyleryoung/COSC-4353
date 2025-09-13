
import { useState } from 'react'
import './App.css'
import Login from "./components/login/Login_signup";
import User_Profile_Management from "./components/User_Profile_Management/User_Profile_Management";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  }
return (
    <div className="App">
      {isLoggedIn ? (
        <User_Profile_Management />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App
