console.log("TsignUp component loaded!");

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TsignUp.css";
import Navbar from "../../components/Navbar";

export default function TsignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Teacher Sign Up Data:", formData);
    // هنا ممكن تضيفي منطق التسجيل الحقيقي
  };

  return (
    <div className="signup-container">
      <Navbar />
      <h2 className="signup-title">Teacher Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
        />
        <input type="date" name="dob" required onChange={handleChange} />
        <div className="gender-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>
        <button
          type="submit"
          className="signup-button"
          onClick={() => navigate("/")}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
