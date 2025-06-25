import React, { useState } from 'react';
import './coursePlan.css';

const initialRows = [
  {
    week: '1',
    lecName: 'Introduction to Numbers',
    subtopics: ['What are numbers?', 'Counting from 1 to 10', 'Introduction to zero'],
    exams: '',
    activity: 'Project Introduction & Steps'
  },
  {
    week: '2',
    lecName: 'Basic Addition and Subtraction',
    subtopics: ['Adding numbers up to 10', 'Subtracting numbers up to 10'],
    exams: '',
    activity: 'Step 1: Planning the Project'
  },
  {
    week: '3',
    lecName: 'Shapes and Geometry',
    subtopics: ['Basic shapes (Circle, Square, Triangle)', 'Introduction to symmetry', 'How to measure angles'],
    exams: 'Midterm',
    activity: 'Step 2: Project Design & Review'
  },
  {
    week: '4',
    lecName: 'Multiplication and Division',
    subtopics: ['Introduction to multiplication', 'Introduction to division'],
    exams: '',
    activity: 'Step 3: Project Development'
  },
  {
    week: '5',
    lecName: 'Review and Reinforcement',
    subtopics: ['Review of all topics', 'Recap of numbers, addition, subtraction, shapes, and multiplication/division'],
    exams: 'Final',
    activity: 'Step 4: Finalizing Project & Submission'
  }
];

const CoursePlanPage = () => {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (index, field, value, subIndex) => {
    const updated = [...rows];
    if (subIndex !== undefined) {
      updated[index][field][subIndex] = value;
    } else {
      updated[index][field] = value;
    }
    setRows(updated);
  };

  const swapSubtopics = (weekIndex1, subIndex1, weekIndex2, subIndex2) => {
    const updated = [...rows];
    const temp = updated[weekIndex1].subtopics[subIndex1];
    updated[weekIndex1].subtopics[subIndex1] = updated[weekIndex2].subtopics[subIndex2];
    updated[weekIndex2].subtopics[subIndex2] = temp;
    setRows(updated);
  };

  const moveSubtopicAcrossWeeks = (fromWeekIdx, fromSubIdx, toWeekIdx, toSubIdx) => {
    const updated = [...rows];
    const movedItem = updated[fromWeekIdx].subtopics.splice(fromSubIdx, 1)[0];
    updated[toWeekIdx].subtopics.splice(toSubIdx, 0, movedItem);
    setRows(updated);
  };

  const handlePrint = () => {
    console.log('Printing Course Plan...');
  };

  const handleActionClick = (type, weekIndex) => {
    console.log(`${type} clicked for week ${rows[weekIndex].week}`);
    // يمكن هنا تفعيل مودال أو انتقال حسب الزر
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
  <div className="subtopic-text">{subtopic}</div>
  <div className="subtopic-buttons">
    {(subIdx > 0 || idx > 0) && (
      <button
        onClick={() => {
          if (subIdx > 0) {
            swapSubtopics(idx, subIdx, idx, subIdx - 1);
          } else if (idx > 0) {
            moveSubtopicAcrossWeeks(idx, subIdx, idx - 1, rows[idx - 1].subtopics.length);
          }
        }}
        className="move-up-btn"
      >
        ↑
      </button>
    )}
    {(subIdx < row.subtopics.length - 1 || idx < rows.length - 1) && (
      <button
        onClick={() => {
          if (subIdx < row.subtopics.length - 1) {
            swapSubtopics(idx, subIdx, idx, subIdx + 1);
          } else if (idx < rows.length - 1) {
            moveSubtopicAcrossWeeks(idx, subIdx, idx + 1, 0);
          }
        }}
        className="move-down-btn"
      >
        ↓
      </button>
    )}
  </div>
</div>

                  ))}
                </td>
                
               
                <td>
                  <div className="actions-buttons">
                    <button className="btn-content" onClick={() => handleActionClick('content', idx)}>Content</button>
                    <button className="btn-assignment" onClick={() => handleActionClick('assignment', idx)}>Assignment</button>
                    <button className="btn-activity" onClick={() => handleActionClick('activity', idx)}>Activity</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-group">
        <button className="next-button">Save</button>
        <button className="next-button" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default CoursePlanPage;
