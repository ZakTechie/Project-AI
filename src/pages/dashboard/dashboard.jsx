import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../../components/Navbar";

const dummyCourses = [
  {
    name: "Math",
    code: "M101",
    topics: [
      { title: "Introduction to Numbers" },
      { title: "Basic Addition and Subtraction" },
      { title: "Shapes and Geometry" },
      { title: "Multiplication and Division" },
      { title: "Review and Reinforcement" },
    ],
  },
  {
    name: "Physics",
    code: "P202",
    topics: [{ title: "Mechanics" }],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [courses, setCourses] = useState(dummyCourses);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
  });

  const toggleCourse = (index) => {
    setExpandedCourse(expandedCourse === index ? null : index);
    setExpandedTopic(null);
  };

  const toggleTopic = (index) => {
    setExpandedTopic(expandedTopic === index ? null : index);
    setSelectedTitle(expandedTopic === index ? null : index);
  };

  const handleServiceClick = (path) => {
    navigate(path);
  };

  const getAvailableServices = () => {
    if (expandedTopic !== null) {
      return (
        <>
          <div
            className="service-card"
            onClick={() => handleServiceClick("/course-content")}
          >
            👥<p>Generate a lesson content</p>
          </div>
          <div
            className="service-card"
            onClick={() => handleServiceClick("/exam-generator")}
          >
            📄<p>Generate an exam/Assignment</p>
          </div>
        </>
      );
    } else if (expandedCourse !== null) {
      return (
        <>
          <div
            className="service-card"
            onClick={() => handleServiceClick("/syllabus")}
          >
            📖<p>Generate a course syllabus</p>
          </div>
          <div
            className="service-card"
            onClick={() => handleServiceClick("/plan")}
          >
            ✏️<p>Generate a course plan</p>
          </div>
          <div
            className="service-card"
            onClick={() => handleServiceClick("/exam-generator")}
          >
            📄<p>Generate an exam/Assignment</p>
          </div>
          <div
            className="service-card"
            onClick={() => handleServiceClick("/project-details")}
          >
            ⚗️<p>Generate course activities</p>
          </div>
        </>
      );
    }
    return null;
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.code) {
      setCourses([...courses, newCourse]);
      setNewCourse({ name: "", code: "" });
      setShowModal(false);
    } else {
      alert("Please fill in course name and code.");
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="sidebar">
        <div className="logo">Dashboard</div>
        <nav>
          <p className="courses-title">My courses</p>
          {courses.length === 0 ? (
            <p className="empty-message">No courses available</p>
          ) : (
            <ul>
              {courses.map((course, i) => (
                <li key={i} onClick={() => toggleCourse(i)}>
                  {course.name} ({course.code})
                  {expandedCourse === i && (
                    <ul>
                      {course.topics.map((topic, j) => (
                        <li
                          key={j}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTopic(j);
                          }}
                          className={
                            selectedTitle === j ? "selected-title" : ""
                          }
                        >
                          {topic.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="new-course" onClick={() => setShowModal(true)}>
            New course +
          </div>
        </nav>
      </div>

      <div className="main-content">
        <section className="services">
          <h2>Services</h2>
          <div className="services-grid">{getAvailableServices()}</div>
        </section>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Course</h2>
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={handleCourseChange}
            />
            <input
              type="text"
              name="code"
              placeholder="Course Code"
              value={newCourse.code}
              onChange={handleCourseChange}
            />

            <div className="modal-actions">
              <button onClick={handleAddCourse}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
