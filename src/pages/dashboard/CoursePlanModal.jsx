import React from "react";

const CoursePlanModal = ({ planForm, onChange, onSave, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="form-title">Course Plan Form</h2>

        <div className="form-group">
          <label className="form-label">Number of Weeks</label>
          <input
            type="text"
            name="weeks"
            value={planForm.weeks}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Lectures per Week</label>
          <input
            type="text"
            name="lecturesPerWeek"
            value={planForm.lecturesPerWeek}
            onChange={onChange}
          />
        </div>

        <div className="modal-actions">
          <button className="gold-button" onClick={onSave}>Save</button>
          <button className="gold-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CoursePlanModal;
