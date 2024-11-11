import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === "") {
      setErrorMessage("Username is required");
      return;
    }
    if (password.trim() === "") {
      setErrorMessage("Password is required");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    localStorage.setItem("username", username);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage("");
          }}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
