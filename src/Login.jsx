import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

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

    const savedUser = JSON.parse(
      localStorage.getItem("libraryUser")
    );

    if (
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password
    ) {
      setError("");

      localStorage.setItem("isLoggedIn", "true");

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      window.location.href = "/dashboard";

    } else {
      setError("Invalid email or password");
    }
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

        {/* RIGHT LOGIN SECTION */}

        <div className="auth-form-panel">

          <div className="auth-form-content">

            <div className="auth-heading">

              <p className="form-eyebrow">
                LIBRARY MANAGEMENT SYSTEM
              </p>

              <h2>Welcome Back!</h2>

              <p className="form-description">
                Admin Login
                <br />
                Sign in to manage your library.
              </p>

            </div>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}

              <div className="auth-field">

                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              {/* PASSWORD */}

              <div className="auth-field">

                <label>Password</label>

                <div className="password-wrapper">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              {/* REMEMBER ME */}

              <div className="auth-options">

                <label className="remember-option">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  Remember me

                </label>

              </div>

              {/* ERROR MESSAGE */}

              {error && (
                <p className="auth-error">
                  {error}
                </p>
              )}

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="auth-submit"
              >
                Login
                <span>→</span>
              </button>

            </form>

            {/* REGISTER LINK */}

            <div className="auth-switch">

              Don't have an account?

              <Link to="/register">
                Register
              </Link>

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

export default Login;
