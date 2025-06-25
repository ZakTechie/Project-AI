import React, { useState } from "react";
import "./coursePlan.css";

const initialRows = [
  {
    week: "1",
    lecName: "Introduction to Numbers",
    subtopics: [
      "What are numbers?",
      "Counting from 1 to 10",
      "Introduction to zero",
    ],
    exams: "",
    activity: "Project Introduction & Steps",
  },
  {
    week: "2",
    lecName: "Basic Addition and Subtraction",
    subtopics: ["Adding numbers up to 10", "Subtracting numbers up to 10"],
    exams: "",
    activity: "Step 1: Planning the Project",
  },
  {
    week: "3",
    lecName: "Shapes and Geometry",
    subtopics: [
      "Basic shapes (Circle, Square, Triangle)",
      "Introduction to symmetry",
      "How to measure angles",
    ],
    exams: "Midterm",
    activity: "Step 2: Project Design & Review",
  },
  {
    week: "4",
    lecName: "Multiplication and Division",
    subtopics: ["Introduction to multiplication", "Introduction to division"],
    exams: "",
    activity: "Step 3: Project Development",
  },
  {
    week: "5",
    lecName: "Review and Reinforcement",
    subtopics: [
      "Review of all topics",
      "Recap of numbers, addition, subtraction, shapes, and multiplication/division",
    ],
    exams: "Final",
    activity: "Step 4: Finalizing Project & Submission",
  },
];

const CoursePlanPage = () => {
  const [rows] = useState(initialRows);

  const handlePrint = () => {
    console.log(rows);
  };

  const handleActionClick = (type, weekIndex) => {
    console.log(`${type} clicked for week ${rows[weekIndex].week}`);
  };

  return (
    <div className="course-plan-container">
      <h1 className="course-plan-title">Course Plan</h1>

      <div className="table-wrapper">
        <table className="course-plan-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Lecture</th>
              <th>Topics</th>
              <th>Exam</th>
              <th>Assignment / Project</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td className="week-cell">Week {row.week}</td>
                <td>{row.lecName}</td>
                <td className="subtopic-cell">
                  {row.subtopics.map((subtopic, subIdx) => (
                    <div key={subIdx} className="subtopic-row">
                      {subtopic}
                    </div>
                  ))}
                </td>
                <td>{row.exams}</td>
                <td>{row.activity}</td>
                <td>
                  <div className="actions-buttons">
                    <button
                      className="btn-content"
                      onClick={() => handleActionClick("content", idx)}
                    >
                      Content
                    </button>
                    <button
                      className="btn-assignment"
                      onClick={() => handleActionClick("assignment", idx)}
                    >
                      Assignment
                    </button>
                    <button
                      className="btn-exam"
                      onClick={() => handleActionClick("exam", idx)}
                    >
                      Exam
                    </button>
                    <button
                      className="btn-activity"
                      onClick={() => handleActionClick("activity", idx)}
                    >
                      Activity
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-group">
        <button className="next-button">Next</button>
        <button className="next-button" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default CoursePlanPage;
