import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./output.css";
import Navbar from "../../components/Navbar";
import jsPDF from "jspdf"; // ✅ مكتبة PDF

export default function OutputPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const { serviceName, courseName, coursCode, topic, lesson, result } =
    location.state || {};

  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    if (result?.trim()) {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < result.length - 1) {
          setAnimatedText((prev) => prev + result[index]);
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 3);
      return () => clearInterval(typingInterval);
    } else {
      setAnimatedText(
        "❌ No result was returned. Please try again or select a different topic/service."
      );
    }
  }, [result]);

  const getServiceTitle = (name) => {
    if (!name) return "Service Output";
    const n = name.toLowerCase();
    if (n.includes("test")) return "✅ Test";
    if (n.includes("summary")) return "✏️ Summary";
    if (n.includes("drill")) return "🅰️ Drill";
    if (n.includes("example")) return "💬 Learn Through Examples";
    if (n.includes("content") || n.includes("lesson"))
      return "📖 Personalized Content";
    return name;
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 10;
    const maxLineWidth = 180;

    const fullText = result?.trim() || "❌ No result was returned.";
    const lines = doc.splitTextToSize(fullText, maxLineWidth);

    let y = margin;

    doc.setFont("helvetica");
    doc.setFontSize(12);

    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save(`${serviceName || "output"}.pdf`);
  };

  return (
    <div className="output-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 style={{ color: "black" }}>📌 Selected:</h2>
        <button
          style={{ display: "block" }}
          onClick={() => navigate("/STdashboard")}
        >
          Back to Services
        </button>
        {serviceName && (
          <p>
            <span>Service:</span> {getServiceTitle(serviceName)}
          </p>
        )}
        {courseName && (
          <p>
            <span>Course:</span> {`${courseName} (${coursCode})`}
          </p>
        )}
        {topic && (
          <p>
            <span>Topic:</span> {topic}
          </p>
        )}
        {lesson && (
          <p>
            <span>Subtopic:</span> {lesson}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <div className="output-section">
          <h1>{getServiceTitle(serviceName)}</h1>
          <div className="output-box">
            <p className="note">📓 Contents in notebook style</p>
            <div
              className="result"
              style={{
                whiteSpace: "pre-wrap",
                maxWidth: "100%",
              }}
            >
              {animatedText}
            </div>
          </div>

          <div className="media-buttons">
            <button className="audio">🎧 Audio</button>
            <button className="video">🎥 Video</button>
            <button className="ppt">📊 PowerPoint</button>
            <button className="download" onClick={handleDownloadPDF}>
              📥 Download as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
