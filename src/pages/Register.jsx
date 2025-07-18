// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Form.css";

const Register = () => {
  const [role, setRole] = useState("student");
  const [year, setYear] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid";
    if (formData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (!year) errs.year = "Please select your year";
    if (role === "admin" && year !== "4th")
      errs.role = "Only final year students can register as Mentor/Admin";
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
        login({ name: formData.name, role });
        navigate(role === "admin" ? "/admin" : "/dashboard");
      }, 1500);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Your Space</h2>

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
          Mentor (Admin)
        </button>
      </div>
      {errors.role && <p className="error">{errors.role}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          {errors.name && (
            <span id="name-error" className="error">
              {errors.name}
            </span>
          )}
        </label>

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
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby="confirmPassword-error"
          />
          {errors.confirmPassword && (
            <span id="confirmPassword-error" className="error">
              {errors.confirmPassword}
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
            Required for Mentor/Admin registration
          </small>
          {errors.year && <p className="error">{errors.year}</p>}
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;