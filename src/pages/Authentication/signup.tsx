import { useState } from "react";
import "./Authentication_Page.css";
import { Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Validation regex patterns
const USER_REGEX = /^[A-z0-9-_]{4,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$]).{8,20}$/;

interface SignupProps {
  onSignup: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Validation states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Real-time validation functions
  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Username is required");
      return false;
    }
    if (!USER_REGEX.test(value)) {
      setNameError("Username must be 4-20 characters (letters, numbers, -, _)");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required");
      return false;
    }
    if (!PWD_REGEX.test(value)) {
      setPasswordError("Password must be 8-20 characters with uppercase, lowercase, number, and special character (!@$)");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Handle input changes with validation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  // Check overall form validity
  const checkFormValidity = () => {
    const nameValid = validateName(name);
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    setIsValid(nameValid && emailValid && passwordValid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation check
    checkFormValidity();
    
    if (validateName(name) && validateEmail(email) && validatePassword(password)) {
      console.log("✅ Validation passed! Signing up:", name, email);
      onSignup();
    } else {
      console.log("❌ Validation failed. Please fix errors.");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="header text-center mb-6">
          <div className="text text-3xl font-bold text-gray-800 mb-2">Sign Up</div>
          <div className="underline"></div>
        </div>
        
        <form className="inputs space-y-4" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="input">
            <input
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                nameError 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              type="text"
              placeholder="Username (4-20 chars, letters, numbers, -, _)"
              value={name}
              onChange={handleNameChange}
              required
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <ErrorOutlineIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                {nameError}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="input">
            <input
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                emailError 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <ErrorOutlineIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                {emailError}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="input">
            <div className="relative">
              <input
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  passwordError 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="Password (8-20 chars, A-z, 0-9, !@$)"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
                ) : (
                  <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <ErrorOutlineIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                {passwordError}
              </p>
            )}
            
            {/* Password Requirements Helper */}
            {password && (
              <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs">
                <p className="font-medium text-gray-700 mb-1">Password Requirements:</p>
                <div className="grid grid-cols-2 gap-1">
                  <span className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                    {/[a-z]/.test(password) ? (
                      <CheckCircleOutlineIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    )} Lowercase
                  </span>
                  <span className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                    {/[A-Z]/.test(password) ? (
                      <CheckCircleOutlineIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    )} Uppercase
                  </span>
                  <span className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                    {/[0-9]/.test(password) ? (
                      <CheckCircleOutlineIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    )} Number
                  </span>
                  <span className={`flex items-center ${/[!@$]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                    {/[!@$]/.test(password) ? (
                      <CheckCircleOutlineIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    )} !@$ Special
                  </span>
                  <span className={`flex items-center ${password.length >= 8 && password.length <= 20 ? 'text-green-600' : 'text-gray-400'}`}>
                    {password.length >= 8 && password.length <= 20 ? (
                      <CheckCircleOutlineIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                    )} 8-20 chars
                  </span>
                </div>
              </div>
            )}
          </div>
          <button 
            type="submit" 
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              name && email && password && !nameError && !emailError && !passwordError
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            disabled={!name || !email || !password || !!nameError || !!emailError || !!passwordError}
          >
            {name && email && password && !nameError && !emailError && !passwordError 
              ? '✅ Sign Up' 
              : 'Sign Up'
            }
          </button>

          {/* Validation Summary */}
          {(name || email || password) && (
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                <AssignmentIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                Validation Status:
              </h4>
              <ul className="space-y-1">
                <li className={`flex items-center ${name && !nameError ? 'text-green-600' : 'text-gray-500'}`}>
                  {name && !nameError ? (
                    <CheckCircleOutlineIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  )}
                  Valid username (4-20 chars, A-z, 0-9, -, _)
                </li>
                <li className={`flex items-center ${email && !emailError ? 'text-green-600' : 'text-gray-500'}`}>
                  {email && !emailError ? (
                    <CheckCircleOutlineIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  )}
                  Valid email address
                </li>
                <li className={`flex items-center ${password && !passwordError ? 'text-green-600' : 'text-gray-500'}`}>
                  {password && !passwordError ? (
                    <CheckCircleOutlineIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  )}
                  Strong password (8-20 chars, A-z, 0-9, !@$)
                </li>
              </ul>
            </div>
          )}
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;