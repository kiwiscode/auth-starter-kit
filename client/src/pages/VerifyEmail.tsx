import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

const VerifyEmail: React.FC = () => {
  const { user } = useAuth();
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof token === "undefined") return;

    if (!token) {
      if (user) {
        navigate(-1);
      } else {
        navigate("/login");
      }
      return;
    }

    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);
        setTimeout(() => {
          setStatus("success");
          setMessage(res.data.message || "Email successfully verified!");
        }, 1000);
        setTimeout(() => {
          if (user) {
            navigate("/profile");
          } else {
            navigate("/login");
          }
        }, 3000);
      } catch (err: unknown) {
        setStatus("error");
        if (isAxiosError(err)) {
          setMessage(
            err.response?.data?.error || "Verification failed or token expired."
          );
        } else {
          setMessage("Verification failed or token expired.");
        }
      }
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
      <h2>Email Verification</h2>
      {status === "pending" && <p>Verifying...</p>}
      {status === "success" && <p style={{ color: "green" }}>{message}</p>}
      {status === "error" && <p style={{ color: "red" }}>{message}</p>}
      {status === "success" && (
        <p>Redirecting to {user ? "profile" : "login"}...</p>
      )}
    </div>
  );
};

export default VerifyEmail;
