import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate(); // استخدام useNavigate للتوجيه بعد الـ logout
  const location = useLocation();
  const isSpecialPage = location.pathname === "/dashboard";
  const handleLogout = () => {
    setIsLoggedIn(false); // تسجيل الخروج
    navigate("/"); // التوجيه إلى الصفحة الرئيسية بعد الخروج
  };

  return (
    <nav className="navbar">
      <ul className={isSpecialPage ? "nav-links-special" : "nav-links"}>
        <li>
          {!isLoggedIn && (
            <Link to={isLoggedIn ? "/dashboard" : "/"}>Home</Link>
          )}
        </li>
        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "0",
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* <li>
              <Link to="/signup">Sign Up</Link>
            </li> */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
