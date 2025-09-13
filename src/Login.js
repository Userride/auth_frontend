import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Normal email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend-1-2elw.onrender.com/api/auth/login",
        formData,
        { withCredentials: true }
      );

      // ✅ Show popup
      alert("Login successful ✅");

      setMessage("Login successful ✅");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setMessage(
        "Login failed ❌ " + (err.response?.data?.message || err.message)
      );
    }
  };

  // 🔹 Redirect user to backend Google OAuth
  const handleGoogleLogin = () => {
    window.location.href =
      "https://backend-1-2elw.onrender.com/api/auth/google";
  };

  return (
    <div
      className="login-container"
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>Login</h2>

      {/* Email / Password login */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
          }}
        >
          Login
        </button>
      </form>

      <p
        style={{
          color: message.includes("failed") ? "red" : "green",
        }}
      >
        {message}
      </p>

      <hr />
      <h3>Or login with Google</h3>

      <button
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#db4437",
          color: "white",
          border: "none",
          borderRadius: 4,
        }}
      >
        Login with Google 🚀
      </button>
    </div>
  );
};

export default Login;
