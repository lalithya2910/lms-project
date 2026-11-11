
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <nav className="navbar">

      <div className="navbar-brand">

        <div className="navbar-logo">
          <span>✦</span>
        </div>

        <div className="navbar-title">
          <h2>BOOKNEST</h2>
          <p>LIBRARY MANAGEMENT SYSTEM</p>
        </div>

      </div>

      <div className="navbar-right">

        <span className="admin-label">
          Administrator
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
