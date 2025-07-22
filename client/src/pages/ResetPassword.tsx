import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { isAxiosError } from "axios";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess("Password changed successfully. Logging in...");
      setUser(res.data.user);
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err: unknown) {
      console.log("err", err);
      if (isAxiosError(err)) {
        setError(err.response?.data?.error || "Password reset failed");
      } else {
        setError("Password reset failed");
      }
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </div>
  );
};

export default ResetPassword;
