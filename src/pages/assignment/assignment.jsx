import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assignment.css";

const assignment = () => {
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);

  useEffect(() => {
    // ❌ تعليق مؤقت للباك
    // const fetchQuestions = async () => {
    //   try {
    //     const token = localStorage.getItem("token");
    //     const response = await axios.get("http://localhost:3000/exam/questions", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setQuestions(response.data.questions);
    //   } catch (err) {
    //     console.error("Error fetching questions", err);
    //   }
    // };
    // fetchQuestions();

    // ✅ داتا وهمية للتجريب
    const dummyQuestions = [
      {
        questionType: "MCQ",
        questionText: "What is the capital of Egypt?",
        options: ["Cairo", "Alexandria", "Giza", "Luxor"],
      },
      {
        questionType: "Fill the blank",
        questionText: "Water freezes at ____ degrees Celsius.",
      },
      {
        questionType: "Essay",
        questionText: "Explain the impact of artificial intelligence on modern education.",
      },
      {
        questionType: "MCQ",
        questionText: "Which of the following is a JavaScript framework?",
        options: ["Laravel", "Django", "React", "Flask"],
      },
    ];

    setQuestions(dummyQuestions);
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedQuestion({ ...questions[index] });
  };

  const handleSave = (index) => {
    const updated = [...questions];
    updated[index] = editedQuestion;
    setQuestions(updated);
    setEditIndex(null);
    setEditedQuestion(null);
    // TODO: Send updated question to backend
  };

  const handleChange = (field, value) => {
    setEditedQuestion((prev) => ({ ...prev, [field]: value }));
  };

  const renderMCQ = (q, index) => (
    <div className="question-box" key={index}>
      <p>
        <strong>{index + 1}. </strong>
        {editIndex === index ? (
          <input
            value={editedQuestion.questionText}
            onChange={(e) => handleChange("questionText", e.target.value)}
          />
        ) : (
          <strong>{q.questionText}</strong>
        )}
      </p>

      <ul>
        {(editIndex === index ? editedQuestion.options : q.options).map((opt, i) => (
          <li key={i}>
            {editIndex === index ? (
              <input
                value={opt}
                onChange={(e) => {
                  const newOptions = [...editedQuestion.options];
                  newOptions[i] = e.target.value;
                  handleChange("options", newOptions);
                }}
              />
            ) : (
              <span>{opt}</span>
            )}
          </li>
        ))}
      </ul>

      {editIndex === index ? (
        <button onClick={() => handleSave(index)}>💾 Save</button>
      ) : (
        <button onClick={() => handleEdit(index)}>✏️ Edit</button>
      )}
    </div>
  );

  const renderFill = (q, index) => (
    <div className="question-box" key={index}>
      <p>
        <strong>{index + 1}. </strong>
        {editIndex === index ? (
          <input
            value={editedQuestion.questionText}
            onChange={(e) => handleChange("questionText", e.target.value)}
          />
        ) : (
          q.questionText
        )}
      </p>

      <input disabled placeholder="_________" className="blank-input" />

      {editIndex === index ? (
        <button onClick={() => handleSave(index)}>💾 Save</button>
      ) : (
        <button onClick={() => handleEdit(index)}>✏️ Edit</button>
      )}
    </div>
  );

  const renderEssay = (q, index) => (
    <div className="question-box" key={index}>
      <p>
        <strong>{index + 1}. </strong>
        {editIndex === index ? (
          <input
            value={editedQuestion.questionText}
            onChange={(e) => handleChange("questionText", e.target.value)}
          />
        ) : (
          q.questionText
        )}
      </p>

      <textarea disabled placeholder="Your answer here..." className="essay-box" />

      {editIndex === index ? (
        <button onClick={() => handleSave(index)}>💾 Save</button>
      ) : (
        <button onClick={() => handleEdit(index)}>✏️ Edit</button>
      )}
    </div>
  );

  return (
    <div className="questions-page">
      <h2>📋 assignment Questions</h2>
      {questions.map((q, i) => {
        if (q.questionType === "MCQ") return renderMCQ(q, i);
        if (q.questionType === "Fill the blank") return renderFill(q, i);
        if (q.questionType === "Essay") return renderEssay(q, i);
        return null;
      })}
    </div>
  );
};

export default assignment;
