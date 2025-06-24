import React, { useState, useEffect } from "react";
import "./SyllabusPage.css";
import { FaEdit, FaTrash, FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SyllabusPage() {
  const [syllabus, setSyllabus] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState([]);
  const [newMainTopic, setNewMainTopic] = useState("");
  const [newSubTopic, setNewSubTopic] = useState("");

  useEffect(() => {
    const mathForBeginnersSyllabus = {
      course_id: 1,
      course_name: "Math for Beginners",
      syllabus: [
        {
          main_topic: "Introduction to Numbers",
          subtopics: [
            { subtopic: "What are numbers?" },
            { subtopic: "Counting from 1 to 10" },
            { subtopic: "Introduction to zero" },
          ],
        },
        {
          main_topic: "Basic Addition and Subtraction",
          subtopics: [
            { subtopic: "Adding numbers up to 10" },
            { subtopic: "Subtracting numbers up to 10" },
          ],
        },
        {
          main_topic: "Shapes and Geometry",
          subtopics: [
            { subtopic: "Basic shapes (Circle, Square, Triangle)" },
            { subtopic: "Introduction to symmetry" },
            { subtopic: "How to measure angles" },
          ],
        },
        {
          main_topic: "Multiplication and Division",
          subtopics: [
            { subtopic: "Introduction to multiplication" },
            { subtopic: "Introduction to division" },
          ],
        },
      ],
    };
    setSyllabus(mathForBeginnersSyllabus.syllabus);
  }, []);

  const addMainTopic = () => {
    if (newMainTopic.trim()) {
      setSyllabus([
        ...syllabus,
        { main_topic: newMainTopic, subtopics: [] },
      ]);
      setNewMainTopic("");
    }
  };

  const addSubTopic = (index) => {
    if (newSubTopic.trim()) {
      const updated = [...syllabus];
      updated[index].subtopics.push({ subtopic: newSubTopic });
      setSyllabus(updated);
      setNewSubTopic("");
    }
  };

  const deleteSubTopic = (mainIndex, subIndex) => {
    const updated = [...syllabus];
    updated[mainIndex].subtopics.splice(subIndex, 1);
    setSyllabus(updated);
  };

  const editSubTopic = (mainIndex, subIndex) => {
    const newSub = prompt("Edit subtopic", syllabus[mainIndex].subtopics[subIndex].subtopic);
    if (newSub !== null) {
      const updated = [...syllabus];
      updated[mainIndex].subtopics[subIndex].subtopic = newSub;
      setSyllabus(updated);
    }
  };

  const toggleMainTopic = (index) => {
    if (expandedTopics.includes(index)) {
      setExpandedTopics(expandedTopics.filter(i => i !== index));
    } else {
      setExpandedTopics([...expandedTopics, index]);
    }
  };

  const swapSubtopics = (mainIndex, subIndex, direction) => {
    const updated = [...syllabus];
    const subtopics = updated[mainIndex].subtopics;

    const targetIndex = direction === "up" ? subIndex - 1 : subIndex + 1;
    if (targetIndex >= 0 && targetIndex < subtopics.length) {
      [subtopics[subIndex], subtopics[targetIndex]] = [subtopics[targetIndex], subtopics[subIndex]];
      setSyllabus(updated);
    }
  };

  const navigate = useNavigate();

  const submitData = async () => {
    const data = {
      course_id: 1,
      syllabus: syllabus,
    };
  
    try {
      const response = await axios.post('/api/submit-syllabus', data);
      console.log("Data submitted successfully", response);
      
      // بعد الإرسال بنجاح، توجيه المستخدم إلى الداشبورد
      navigate('/dashboard');
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <div className="syllabus-page">
      <div className="syllabus-container">
        <h2>Edit Syllabus for Math for Beginners</h2>

        <div className="add-main-section">
          <input
            className="input-box"
            type="text"
            value={newMainTopic}
            onChange={(e) => setNewMainTopic(e.target.value)}
            placeholder="Add main topic"
          />
          <button className="add-button" onClick={addMainTopic}>
            <FaPlus />
          </button>
        </div>

        {syllabus.map((main, i) => (
          <div key={i} className="main-topic">
            <h3 onClick={() => toggleMainTopic(i)}>{main.main_topic}</h3>

            {expandedTopics.includes(i) && (
              <>
                <div className="add-sub-section">
                  <input
                    className="input-box"
                    type="text"
                    value={newSubTopic}
                    onChange={(e) => setNewSubTopic(e.target.value)}
                    placeholder="Add subtopic"
                  />
                  <button className="add-button" onClick={() => addSubTopic(i)}>
                    <FaPlus />
                  </button>
                </div>

                <ul className="subtopic-list">
                  {main.subtopics.map((sub, j) => (
                    <li key={j} className="subtopic-item">
                      <span>{sub.subtopic}</span>

                      <div className="actions">
                        <FaArrowUp onClick={() => swapSubtopics(i, j, "up")} className="icon" />
                        <FaArrowDown onClick={() => swapSubtopics(i, j, "down")} className="icon" />
                        <FaEdit onClick={() => editSubTopic(i, j)} className="icon edit" />
                        <FaTrash onClick={() => deleteSubTopic(i, j)} className="icon delete" />
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}

        <button className="submit-button" onClick={submitData}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default SyllabusPage;
