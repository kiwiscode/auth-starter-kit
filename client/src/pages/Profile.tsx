import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useState } from "react";
import { isAxiosError } from "axios";

const Profile: React.FC = () => {
  const { user } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeMsg, setChangeMsg] = useState("");
  const [changeError, setChangeError] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeMsg("");
    setChangeError("");
    if (newPassword !== confirmPassword) {
      setChangeError("New passwords do not match.");
      return;
    }
    try {
      const res = await api.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      setChangeMsg(res.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      console.log("err", err);
      if (isAxiosError(err)) {
        setChangeError(err.response?.data?.error || "An error occurred");
      } else {
        setChangeError("An error occurred");
      }
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      <h1>Profile</h1>
      <div>ID: {user.id}</div>
      <div>Email: {user.email}</div>
      <div>Full Name: {user.fullname}</div>
      <div>Active: {user.isActive ? "Yes" : "No"}</div>
      <hr />
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
        <button type="submit">Change Password</button>
      </form>
      {changeMsg && <div style={{ color: "green" }}>{changeMsg}</div>}
      {changeError && <div style={{ color: "red" }}>{changeError}</div>}
    </div>
  );
};

export default Profile;
