
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    if (name === "") {
      setError("Name is required");
      return;
    }

    if (email === "") {
      setError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    if (password === "") {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (confirmPassword === "") {
      setError("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password
    };

    localStorage.setItem("libraryUser", JSON.stringify(user));

    setError("");
    alert("Registration successful");
    navigate("/login");
  }

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT IMAGE SECTION */}

        <div className="auth-visual">

          <div className="library-brand">
            <div className="brand-icon">✦</div>
            <span>BOOKNEST</span>
          </div>

          <div className="visual-content">

            <p className="visual-subtitle">
              YOUR WORLD OF KNOWLEDGE
            </p>

            <h1>
              Discover a
              <br />
              World of
              <br />
              <span>Knowledge.</span>
            </h1>

            <p className="visual-description">
              Every book opens a new door.
              Explore, read and discover something
              extraordinary every day.
            </p>

            <div className="visual-line"></div>

            <p className="visual-footer">
              READ MORE. LEARN MORE. GROW MORE.
            </p>

          </div>

        </div>

        {/* RIGHT REGISTER SECTION */}

        <div className="auth-form-panel">

          <div className="auth-form-content">

            <div className="auth-heading">

              <p className="form-eyebrow">
                LIBRARY MANAGEMENT SYSTEM
              </p>

              <h2>Create Account</h2>

              <p className="form-description">
                Register as an administrator.
                <br />
                Create your account to manage your library.
              </p>

            </div>

            <form onSubmit={handleRegister}>

              <div className="auth-field">
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label>Confirm Password</label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="auth-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="auth-submit"
              >
                Create Account
                <span>→</span>
              </button>

            </form>

            <div className="auth-switch">
              Already have an account?
              <Link to="/login">Login</Link>
            </div>

            <p className="auth-bottom-text">
              YOUR NEXT CHAPTER STARTS HERE.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;
