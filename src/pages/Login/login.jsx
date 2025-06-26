// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Logging in...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { access_token } = response.data.data;

        // تخزين التوكن والمستخدم
        localStorage.setItem("token", access_token);

        Swal.fire({
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        setIsLoggedIn(true);
        navigate("/dashboard", { replace: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Invalid email or password.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login falied",
        text: "Invalid email or password.",
      });
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          style={{ marginBottom: "15px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
