// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Form.css";

const Login = () => {
  const [role, setRole] = useState("student");
  const [year, setYear] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid";
    if (!formData.password) errs.password = "Password is required";
    if (!year) errs.year = "Please select your year";
    if (role === "admin" && year !== "4th")
      errs.role = "Only final year students can login as Mentor/Admin";
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        login({ name: "Tech User", role });
        navigate(role === "admin" ? "/admin" : "/dashboard");
      }, 1500);
    }
  };

  return (
    <div className="form-container">
      <h2>Welcome Back</h2>

      <div className="role-toggle" role="radiogroup" aria-label="Select role">
        <button
          type="button"
          className={role === "student" ? "active" : ""}
          onClick={() => setRole("student")}
          aria-checked={role === "student"}
          role="radio"
        >
          Student
        </button>
        <button
          type="button"
          className={role === "admin" ? "active" : ""}
          onClick={() => setRole("admin")}
          aria-checked={role === "admin"}
          role="radio"
        >
          Mentor
        </button>
      </div>
      {errors.role && <p className="error">{errors.role}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <span id="email-error" className="error">
              {errors.email}
            </span>
          )}
        </label>

        <label>
          Password
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <span id="password-error" className="error">
              {errors.password}
            </span>
          )}
        </label>

        <label>
          Year
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-describedby="year-info"
            required
          >
            <option value="">-- Select your year --</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year (Final)</option>
          </select>
          <small id="year-info" className="info-text">
            Required for Mentor/Admin login
          </small>
          {errors.year && <p className="error">{errors.year}</p>}
        </label>

        <label className="remember-me">
          <input type="checkbox" />
          Remember Me
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
};

export default Login;