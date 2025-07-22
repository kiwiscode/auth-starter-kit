import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAxiosError } from "axios";

const Register: React.FC = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", {
        email,
        fullname,
        password,
      });
      setUser(res.data.user);
      navigate("/profile");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error || "Register failed");
      } else {
        setError("Register failed");
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
      <h1>Register</h1>
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
          <label>Full Name:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
      {error && <div>{error}</div>}
      <hr />
      <div style={{ margin: "16px 0 8px 0", textAlign: "left", color: "#888" }}>
        Or continue with
      </div>
      <button type="button" onClick={googleAuth} style={{ marginTop: 0 }}>
        Continue with Google
      </button>
      <div style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Register;
