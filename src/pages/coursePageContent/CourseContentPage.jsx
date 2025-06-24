import React, { useState, useEffect } from 'react';
import './CourseContentPage.css';
import { FaFilePowerpoint, FaVideo, FaVolumeUp } from 'react-icons/fa';

const CourseContentPage = () => {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const courseContent = `# Introduction to Numbers

## What are Numbers?

Numbers are symbols or words used to represent quantities. They are the foundation of mathematics and are essential for counting, measuring, and labeling. Numbers can be whole numbers (integers), fractions, or decimals, and they help us make sense of the world around us.

### Examples of Numbers:
- Whole numbers: 1, 2, 3, 4, 5
- Decimal numbers: 0.1, 1.5, 2.75
- Negative numbers: -1, -2, -3

---

## Counting from 1 to 10

Counting is one of the first skills we learn with numbers. It helps us organize and compare objects in the world around us.

### Counting Step by Step:
- Start at **1**: This is the first number, the start of the counting process.
- Continue: 2, 3, 4, 5, 6, 7, 8, 9, 10.

#### Activity 1: Count with Me
1. Look around your classroom or home.
2. Find **10** objects.
3. Count them out loud while pointing at each item: "One, two, three…"

---

## Introduction to Zero

What is Zero?

Zero is the special number that represents **nothing**. It’s the number that comes before **one** and plays a crucial role in mathematics. It’s often thought of as "empty," but it is very powerful!

### Importance of Zero:
1. **In Number Systems:** Zero is used in our place-value system to help us organize numbers into ones, tens, hundreds, etc.
2. **In Subtraction:** When you subtract a number by itself, you get zero.
3. **In Temperature:** Zero degrees Celsius means the freezing point of water.

---

## Comparing Numbers (1 to 10)

Now that we know how to count, let's see how we can compare numbers.

### Greater than, Less than, and Equal to:
- **Greater than (>)**: The number on the left side is bigger than the number on the right.
- **Less than (<)**: The number on the left side is smaller than the number on the right.
- **Equal to (=)**: Both numbers are the same.

---

## Fun Facts about Numbers

- Numbers are used in **every** field of life, like shopping, playing sports, or even in science experiments.
- **Pi (π)** is an important number that helps measure circles. It’s approximately **3.14**.

---

## Summary and Recap
1. **Numbers** represent quantities.
2. **Counting** is a skill that helps us organize objects and understand the world.
3. **Zero** represents nothing but is crucial in our number system.
4. **Comparing numbers** allows us to organize numbers from smallest to largest.
    `;
    setContent(courseContent);
    setEditedContent(courseContent);
  }, []);

  const handleToggleEdit = () => {
    if (isEditing) setContent(editedContent);
    setIsEditing(!isEditing);
  };

  const renderContent = () => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <p key={i} className="main-title">{line.replace('# ', '')}</p>;
      if (line.startsWith('## ')) return <p key={i} className="subheading">{line.replace('## ', '')}</p>;
      if (line.startsWith('### ')) return <p key={i} className="sub-subheading">{line.replace('### ', '')}</p>;
      if (line.startsWith('#### ')) return <p key={i} className="activity">{line.replace('#### ', '')}</p>;
      if (line.trim() === '---') return <hr key={i} />;
      if (line.trim() !== '') return <p key={i} className="paragraph">{line}</p>;
      return null;
    });
  };

  return (
    <div className="course-content-container">
      <div className="content-header">
        <h2 className="content-topic">Introduction to Numbers</h2>
        <button className="icon-button" onClick={handleToggleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="content-box">
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

      <div className="media-buttons">
        <button className="btn-ppt" onClick={() => console.log('ppt')}>
          <FaFilePowerpoint className="btn-icon" /> PPT
        </button>
        <button className="btn-video" onClick={() => console.log('video')}>
          <FaVideo className="btn-icon" /> Video
        </button>
        <button className="btn-audio" onClick={() => console.log('audio')}>
          <FaVolumeUp className="btn-icon" /> Audio
        </button>
      </div>
    </div>
  );
};

export default CourseContentPage;
