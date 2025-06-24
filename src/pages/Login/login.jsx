import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import "./Login.css";
import Navbar from "../../components/Navbar";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // تعريف navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا بتأكد إن البيانات صحيحة
    if (email && password) {
      setIsLoggedIn(true); // تغيير حالة تسجيل الدخول
      navigate("/dashboard"); // التوجيه إلى صفحة الـ Dashboard
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
          style={{ marginBottom: "15px" }}
          type="password"
          name="password"
          required
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
