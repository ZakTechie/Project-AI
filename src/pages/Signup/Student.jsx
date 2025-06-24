import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TsignUp.css";
import Navbar from "../../components/Navbar";

export default function Student() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    learningStyle: {
      active: "",
      intuitive: "",
      verbal: "",
      sequential: "",
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLearningStyleChange = (category, value) => {
    setFormData((prev) => ({
      ...prev,
      learningStyle: {
        ...prev.learningStyle,
        [category]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Sign Up Data:", formData);
    // ممكن تضيفي منطق التسجيل الحقيقي هنا
  };

  return (
    <div className="signup-container">
      <Navbar />
      <h2 className="signup-title">Student Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
        <input type="date" name="dob" required onChange={handleChange} />

        <div className="gender-group">
          <label>
            <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
          </label>
        </div>

        {/* Learning Style Section */}
        <div className="learning-style-section">
          <label className="learning-style-label">
            Learning Style<span style={{ color: "red" }}> *</span>
          </label>
          <div className="learning-style-group">
            <div className="learning-style-row">
              <label>
                <input
                  type="radio"
                  name="activeReflective"
                  value="active"
                  onChange={() => handleLearningStyleChange("active", "active")}
                  checked={formData.learningStyle.active === "active"}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="activeReflective"
                  value="reflective"
                  onChange={() => handleLearningStyleChange("active", "reflective")}
                  checked={formData.learningStyle.active === "reflective"}
                />
                Reflective
              </label>
            </div>
            <div className="learning-style-row">
              <label>
                <input
                  type="radio"
                  name="intuitiveSensor"
                  value="intuitive"
                  onChange={() => handleLearningStyleChange("intuitive", "intuitive")}
                  checked={formData.learningStyle.intuitive === "intuitive"}
                />
                Intuitive
              </label>
              <label>
                <input
                  type="radio"
                  name="intuitiveSensor"
                  value="sensor"
                  onChange={() => handleLearningStyleChange("intuitive", "sensor")}
                  checked={formData.learningStyle.intuitive === "sensor"}
                />
                Sensor
              </label>
            </div>
            <div className="learning-style-row">
              <label>
                <input
                  type="radio"
                  name="verbalVisual"
                  value="verbal"
                  onChange={() => handleLearningStyleChange("verbal", "verbal")}
                  checked={formData.learningStyle.verbal === "verbal"}
                />
                Verbal
              </label>
              <label>
                <input
                  type="radio"
                  name="verbalVisual"
                  value="visual"
                  onChange={() => handleLearningStyleChange("verbal", "visual")}
                  checked={formData.learningStyle.verbal === "visual"}
                />
                Visual
              </label>
            </div>
            <div className="learning-style-row">
              <label>
                <input
                  type="radio"
                  name="sequentialGlobal"
                  value="sequential"
                  onChange={() => handleLearningStyleChange("sequential", "sequential")}
                  checked={formData.learningStyle.sequential === "sequential"}
                />
                Sequential
              </label>
              <label>
                <input
                  type="radio"
                  name="sequentialGlobal"
                  value="global"
                  onChange={() => handleLearningStyleChange("sequential", "global")}
                  checked={formData.learningStyle.sequential === "global"}
                />
                Global
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}
