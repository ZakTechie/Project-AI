import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  // const [selectedTitle, setSelectedTitle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseCode: "",
    domain: "",
    subdomain: "",
    level: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3000/course", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // افترض إن الاستجابة عبارة عن مصفوفة من الكورسات
        const formattedCourses = response.data.data.map((course) => ({
          courseName: course.courseName,
          courseCode: course.courseCode,
          courseId: course._id,
        }));

        setCourses(formattedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const toggleCourse = (index) => {
    setExpandedCourse(expandedCourse === index ? null : index);
    setExpandedTopic(null);
  };

  // const toggleTopic = (index) => {
  //   setExpandedTopic(expandedTopic === index ? null : index);
  //   setSelectedTitle(expandedTopic === index ? null : index);
  // };

  const handleServiceClick = (path) => {
    navigate(path);
  };
  // const handleServiceClick = async (path) => {
  //   const token = localStorage.getItem("token");

  //   // ✅ إظهار سبينر التحميل قبل الطلب
  //   Swal.fire({
  //     title: "Creating Syllabus...",
  //     allowOutsideClick: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3000/course/createSyllabus/${expandedCourse}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // ✅ لو الطلب نجح، غيّر الرسالة إلى نجاح
  //     Swal.fire({
  //       icon: "success",
  //       title: "Syllabus created!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     }).then(() =>
  //       navigate(`${path}`, { state: [response.data.data, expandedCourse] })
  //     ); // تقدر تمرر courseId في المسار لو عايز
  //   } catch (error) {
  //     console.error("Error creating syllabus:", error);

  //     Swal.fire({
  //       icon: "error",
  //       title: "Failed to create syllabus",
  //       text: error?.response?.data?.message || "Please try again later",
  //     });
  //   }
  // };

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

  const handleAddCourse = async () => {
    setShowModal(false);

    if (newCourse.courseName && newCourse.courseCode) {
      // إظهار سبينر التحميل
      Swal.fire({
        title: "Adding Course...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:3000/course/add-course",
          newCourse,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          setCourses([...courses, newCourse]);
          setNewCourse({
            courseName: "",
            courseCode: "",
            domain: "",
            subdomain: "",
            level: "",
          });
          setShowModal(false);

          Swal.fire({
            icon: "success",
            title: "Course added successfully!",
            showConfirmButton: false,
            timer: 500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: "Please try again.",
          });
        }
      } catch (error) {
        console.error("Error adding course:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to add course",
          text: "Course added before",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Missing data",
        text: "Please fill in course name and code.",
      });
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
              {courses.map((course) => (
                <li
                  key={course.courseId}
                  onClick={() => toggleCourse(course.courseId)}
                >
                  {course.courseName} ({course.courseCode})
                  {expandedCourse === course.courseId && (
                    <ul>
                      {/* {course.topics.map((topic, j) => (
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
                      ))} */}
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
          <div className="modal-box">
            <h2 className="form-title">Add New Course</h2>

            <div className="form-group">
              <label className="form-label">Course Name</label>
              <input
                type="text"
                name="courseName"
                onChange={handleCourseChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Course Code</label>
              <input
                type="text"
                name="courseCode"
                onChange={handleCourseChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Domain</label>
              <input type="text" name="domain" onChange={handleCourseChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Subdomain</label>
              <input
                type="text"
                name="subdomain"
                onChange={handleCourseChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Level</label>
              <div className="level-options">
                {["Beginner", "Median", "Advanced"].map((level) => (
                  <label
                    key={level}
                    className={`check-radio ${
                      newCourse.level === level ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="level"
                      value={level}
                      checked={newCourse.level === level}
                      onChange={handleCourseChange}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="gold-button" onClick={handleAddCourse}>
                Save
              </button>
              <button
                className="gold-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
