import { useState } from "react";
import { Link } from 'react-router-dom';
import "./Authentication_Page.css";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in:", email, password);
    onLogin();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="header text-center mb-6">
          <div className="text text-3xl font-bold text-gray-800 mb-2">Login</div>
          <div className="underline"></div>
        </div>
        
        <form className="inputs space-y-4" onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Login
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Need to create an Account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
            Sign up Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;