import "./styles.css";

export default function ExamGenerator() {
  return (
    <div className="exam-page">
      <div className="exam-container">
        <h2 className="exam-title">GENERATING EXAM</h2>

        <div className="exam-section">
          <label className="section-label">Topics</label>
          <textarea className="input-box" placeholder="" />
        </div>

        <div className="exam-section">
          <label className="section-label">Degree of Difficulty</label>
          <div className="difficulty-container">
            <div className="difficulty-item">
              <span className="easy">Easy</span>
              <input type="number" className="percentage-input" placeholder="%" />
            </div>
            <div className="difficulty-item">
              <span className="medium">Medium</span>
              <input type="number" className="percentage-input" placeholder="%" />
            </div>
            <div className="difficulty-item">
              <span className="hard">Hard</span>
              <input type="number" className="percentage-input" placeholder="%" />
            </div>
          </div>
        </div>

        <div className="exam-section">
          <label className="section-label">Type of Question</label>
          <div className="question-type-container">
            <label><input type="checkbox" /> MCQ</label>
            <label><input type="checkbox" /> Fill the Blank</label>
            <label><input type="checkbox" /> Essay</label>
          </div>
        </div>

        <div className="exam-section">
          <label className="section-label">Time</label>
          <input type="text" className="small-input" />
          <label className="section-label">Grade</label>
          <input type="text" className="small-input" />
        </div>

        <div className="button-container">
          <button className="assignment-button">Assignment</button>
          <button className="exam-button">Exam</button>
        </div>
      </div>
    </div>
  );
}
