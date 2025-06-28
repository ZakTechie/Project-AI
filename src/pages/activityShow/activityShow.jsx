import React, { useState, useEffect } from "react";
import "./activityShow.css";

const ActivityShow = () => {
  const [content, setContent] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const activityText = `
# Project: Arithmetic and Logical Unit (ALU)

## Objective
Design and implement an ALU that performs basic arithmetic and logical operations using digital logic components or simulation tools.

## Steps

### 1. Theoretical Introduction
Explain ALU’s role in CPU and review number systems and binary representations.

### 2. Define Required Operations
Decide on operations: ADD, SUB, MUL, DIV, AND, OR, NOT, XOR.

### 3. Design the Circuit
Build logic gates for each operation. Use Full Adder for addition, etc.

### 4. Create Control Logic
Design a selector to choose the correct operation based on a code.

### 5. Testing
Verify each operation with test cases and compare results with expectations.

### 6. Documentation
Write a brief report explaining the project design, functions, and learning outcomes.

---

## Common Issues & Solutions

### Problem: Confusion with signed/unsigned numbers
### Solution: Use visual examples and manual conversion tasks.

### Problem: Wrong gate connections in simulation
### Solution: Build and test incrementally.

### Problem: Overflow/underflow not handled
### Solution: Add flags and teach how to manage them.

---

## Teacher Tips
Encourage teamwork and split complex operations between group members.  
Break the work into weekly milestones.  
Use small challenges to assess understanding during each phase.
    `;

    setContent(activityText);
    setEditedContent(activityText);
  }, []);

  const handleToggleEdit = () => {
    if (isEditing) {
      setContent(editedContent); // حفظ التعديلات
    }
    setIsEditing(!isEditing);
  };

  const renderContent = () => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <p key={i} className="main-title">{line.replace("# ", "")}</p>;
      if (line.startsWith("## ")) return <p key={i} className="subheading">{line.replace("## ", "")}</p>;
      if (line.startsWith("### ")) return <p key={i} className="sub-subheading">{line.replace("### ", "")}</p>;
      if (line.startsWith("#### ")) return <p key={i} className="activity">{line.replace("#### ", "")}</p>;
      if (line.trim() === "---") return <hr key={i} />;
      if (line.trim() !== "") return <p key={i} className="paragraph">{line}</p>;
      return null;
    });
  };

  return (
    <div className="course-content-container">
      <div className="content-header">
        <button className="edit-button" onClick={handleToggleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <textarea
          className="content-editor"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={30}
        />
      ) : (
       renderContent()
      )}
    </div>
  );
};

export default ActivityShow;
