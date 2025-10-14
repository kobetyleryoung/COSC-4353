import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import "./Authentication_Page.css";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithRedirect(); // Redirects user to Auth0 login
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="header text-center mb-6">
          <div className="text text-3xl font-bold text-gray-800 mb-2">Login</div>
          <div className="underline"></div>
        </div>
        
        <form className="inputs space-y-4" onSubmit={handleLogin}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Login with Auth0
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
