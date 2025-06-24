import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import TsignUp from "./pages/Signup/TsignUp";
import Dashboard from "./pages/dashboard/dashboard"; // تأكد من المسار
import SyllabusPage from "./pages/SyllabusPage/SyllabusPage"; // استيراد صفحة السيلابز
import CoursePlan from "./pages/coursePlan/coursePlan"; // استيراد الصفحة الجديدة
import CourseContentPage from "./pages/coursePageContent/CourseContentPage";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import SelectedProjectDetails from "./pages/SelectedProjectDetails/SelectedProjectDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<TsignUp />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/syllabus" element={<SyllabusPage />} />
        <Route path="/plan" element={<CoursePlan />} />
        <Route path="/course-content" element={<CourseContentPage />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route
          path="/selected-project-details"
          element={<SelectedProjectDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
