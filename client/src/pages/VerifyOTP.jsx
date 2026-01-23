{/* Verify OTP component of the frontend */}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const changeInputHandler = (e) => {
    setOtp(e.target.value);
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0 || !userId || !userEmail) return;

    setIsResending(true);
    setError("");
    setMessage("");

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/resendOTP`,
        { userId, email: userEmail }
      );
      setMessage("New OTP sent! Check your email.");
      setResendCooldown(60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    if (!otp) {
      setError("Please enter the OTP code");
      setIsSubmitting(false);
      return;
    }

    if (!userId) {
      setError("User ID not found. Please register again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/verifyOTP`,
        { userId, otp }
      );
      const result = response.data;

      if (result.status === "Verified") {
        setMessage(result.message);
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(result.message);
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Verify OTP</h2>
        <form className="form register__form" onSubmit={verifyOtp}>
          {error && <p className="form__error-message">{error}</p>}
          {message && <p className="form__success-message">{message}</p>}
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            name="otp"
            value={otp}
            onChange={changeInputHandler}
            maxLength={6}
          />
          <button type="submit" className="btn primary" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <small className="resend-otp-container">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResending || resendCooldown > 0 || !userEmail}
            className="resend-otp-btn"
          >
            {isResending ? 'Sending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
          </button>
        </small>
      </div>
    </section>
  );
};

export default VerifyOTP;
