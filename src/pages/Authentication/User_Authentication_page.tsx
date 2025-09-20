import { useState } from 'react';
import "./Authentication_Page.css";

interface LoginSignupProps {
  onLogin: () => void; // Called when login/signup is successful
}

const Login_signup: React.FC<LoginSignupProps> = ({ onLogin }) => {
  const [action, setAction] = useState<"Login" | "Sign Up">("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (action === "Login") {
      console.log("Logging in:", email, password);
    } else {
      console.log("Signing up:", name, email, password);
    }

    onLogin(); // Notify App that login was successful
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <form className="inputs" onSubmit={handleSubmit}>
        {/* Show Name field only when Sign Up */}
        {action === "Sign Up" && (
          <div className="input">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {action}
        </button>
      </form>

      {/* Toggle buttons */}
      <div className="submit-container">
        <div
          className={action === "Sign Up" ? "submit white" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Login" ? "submit white" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Login_signup;
