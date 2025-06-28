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
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [title, setTitle] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseCode: "",
    domain: "",
    subdomain: "",
    level: "",
  });

  const [showPlanModal, setShowPlanModal] = useState(false);
  const [planData, setPlanData] = useState({
    numberOfWeeks: "",
    lecsPerWeek: "",
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

  // const toggleCourse = (index) => {
  //   setExpandedCourse(expandedCourse === index ? null : index);
  //   setExpandedTopic(null);
  // };

  const toggleCourse = async (index) => {
    if (expandedCourse === index) {
      setExpandedCourse(null);
      setExpandedTopic(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:3000/course/coursePlan/${index}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched course plan:", response.data.data.teachingPlan);
      setTitle(response.data.data.teachingPlan);
      setExpandedCourse(index);
      setExpandedTopic(null);
      // optional: store coursePlan in state
    } catch (error) {
      console.error("Error fetching course plan:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch course plan",
        text: error?.response?.data?.message || "Please try again later.",
      });
      setExpandedCourse(index);
      setExpandedTopic(null);
      setTitle([]);
    }
  };

  const toggleTopic = (index) => {
    setExpandedTopic(expandedTopic === index ? null : index);
    setSelectedTitle(expandedTopic === index ? null : index);
    console.log(index);
  };

  const handleServiceClick1 = async (path) => {
    const token = localStorage.getItem("token");

    // ✅ إظهار سبينر التحميل قبل الطلب
    Swal.fire({
      title: "Creating Syllabus...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(
        `http://localhost:3000/course/createSyllabus/${expandedCourse}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ لو الطلب نجح، غيّر الرسالة إلى نجاح
      Swal.fire({
        icon: "success",
        title: "Syllabus created!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() =>
        navigate(`${path}`, { state: [response.data.data, expandedCourse] })
      ); // تقدر تمرر courseId في المسار لو عايز
    } catch (error) {
      console.error("Error creating syllabus:", error);

      Swal.fire({
        icon: "error",
        title: "Failed to create syllabus",
        text: error?.response?.data?.message || "Please try again later",
      });
    }
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
            📄<p>Generate an Assignment</p>
          </div>
          <div
            className="service-card"
            onClick={() => handleServiceClick("/project-details")}
          >
            ⚗️<p>Generate Lesson activities</p>
          </div>
        </>
      );
    } else if (expandedCourse !== null) {
      return (
        <>
          <div
            className="service-card"
            onClick={() => handleServiceClick1("/syllabus")}
          >
            📖<p>Generate a course syllabus</p>
          </div>
          <div className="service-card" onClick={() => setShowPlanModal(true)}>
            ✏️<p>Generate a course plan</p>
          </div>

          <div
            className="service-card"
            onClick={() => handleServiceClick("/exam-generator")}
          >
            📄<p>Generate an exam</p>
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

  const handleMakePlan = async () => {
    if (!planData.numberOfWeeks || !planData.lecsPerWeek) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
      });
      return;
    }

    setShowPlanModal(false);

    Swal.fire({
      title: "Generating Plan...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/course/createPlan/${expandedCourse}`,
        planData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Plan created successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/plan", { state: [response.data.data, expandedCourse] }); // send the generated plan to next page
    } catch (error) {
      console.error("Error generating plan:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to generate plan",
        text: error?.response?.data?.message || "Please try again later.",
      });
    }
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

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/course/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseId !== id)
      );
    } catch (err) {
      console.error("Error deleting course", err);
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      {course.courseName} ({course.courseCode.slice(0, 6)})
                    </span>

                    <svg
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCourse(course.courseId);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      viewBox="0 0 16 16"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                      title="حذف"
                    >
                      <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zm1.5-.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3.086a1 1 0 0 1 .707.293l.707.707h2.586l.707-.707A1 1 0 0 1 9.414 1H12.5a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11z"
                      />
                    </svg>
                  </span>

                  {expandedCourse === course.courseId && (
                    <ul>
                      {title.map((topic, j) =>
                        title.length > 0 ? (
                          <li
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            key={j}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopic(j);
                            }}
                            className={
                              selectedTitle === j ? "selected-title" : ""
                            }
                          >
                            {topic.LectureName}
                            <svg
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCourse(course.courseId);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="white"
                              viewBox="0 0 16 16"
                              style={{ cursor: "pointer", marginLeft: "8px" }}
                              title="حذف"
                            >
                              <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zm1.5-.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3.086a1 1 0 0 1 .707.293l.707.707h2.586l.707-.707A1 1 0 0 1 9.414 1H12.5a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11z"
                              />
                            </svg>
                          </li>
                        ) : (
                          <li
                            key={j}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopic(j);
                            }}
                            className={
                              selectedTitle === j ? "selected-title" : ""
                            }
                          ></li>
                        )
                      )}
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

      {showPlanModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="form-title">Generate Course Plan</h2>

            <div className="form-group">
              <label className="form-label">Number of Weeks</label>
              <input
                type="number"
                name="numberOfWeeks"
                value={planData.numberOfWeeks}
                onChange={(e) =>
                  setPlanData({ ...planData, numberOfWeeks: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lectures per Week</label>
              <input
                type="number"
                name="lecsPerWeek"
                value={planData.lecsPerWeek}
                onChange={(e) =>
                  setPlanData({ ...planData, lecsPerWeek: e.target.value })
                }
              />
            </div>

            <div className="modal-actions">
              <button className="gold-button" onClick={() => handleMakePlan()}>
                Generate
              </button>

              <button
                className="gold-button"
                onClick={() => setShowPlanModal(false)}
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
