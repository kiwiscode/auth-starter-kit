import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";

const Login: React.FC = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      setUser(res.data.user);
      navigate("/profile");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error || "Login failed");
      } else {
        setError("Login failed");
      }
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMsg("");
    setForgotError("");
    try {
      await api.post("/auth/forgot-password", { email: forgotEmail });
      setForgotMsg(
        "If this email is registered, password reset instructions have been sent."
      );
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setForgotError(err.response?.data?.error || "An error occurred");
      } else {
        setForgotError("An error occurred");
      }
    }
  };

  // google auth
  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/api/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div>{error}</div>}
      <div>
        <button type="button" onClick={() => setShowForgot(!showForgot)}>
          Forgot Password?
        </button>
        {showForgot && (
          <form onSubmit={handleForgot}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Send Reset Link</button>
            {forgotMsg && <div>{forgotMsg}</div>}
            {forgotError && <div>{forgotError}</div>}
          </form>
        )}
      </div>
      <hr />
      <div style={{ margin: "16px 0 8px 0", textAlign: "left", color: "#888" }}>
        Or continue with
      </div>
      <button type="button" onClick={googleAuth} style={{ marginTop: 0 }}>
        Continue with Google
      </button>
      <div style={{ marginTop: 16 }}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
