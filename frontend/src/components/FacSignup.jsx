import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Configure axios base URL
const API_BASE_URL = "http://localhost:8080";

export default function FacSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/faculty/register`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          address: form.address,
          status: form.status,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setIsSuccess(true);
      const MSG_ID = "signup-message-box";
      const prev = document.getElementById(MSG_ID);
      if (prev) prev.remove();

      const box = document.createElement("div");
      box.id = MSG_ID;
      box.innerText = `Signup successful! Your Faculty ID is: ${response.data.id}. You can now login.`;
      Object.assign(box.style, {
        width: "100%",
        padding: "14px",
        marginTop: "12px",
        borderRadius: "12px",
        background: "#2ecc71",
        color: "#ffffff",
        fontSize: "16px",
        textAlign: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        cursor: "default",
      });

      const formEl = document.querySelector("form");
      if (formEl && formEl.parentNode) {
        formEl.parentNode.insertBefore(box, formEl.nextSibling);
      }

      const handleFormClick = () => {
        if (box && box.parentNode) box.remove();
        setIsSuccess(false);
        if (formEl) formEl.removeEventListener("click", handleFormClick);
        navigate("");
      };

      if (formEl) {
        formEl.addEventListener("click", handleFormClick, { once: true });
      }

      setMessage("");
      setForm({ name: "", email: "", password: "", address: "" });

      setTimeout(() => {
        navigate("/faculty-login");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Sign up failed. Please try again.");
      } else if (error.request) {
        setMessage("Network error. Please check if the server is running.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const Icon = ({ type }) => {
    const common = { width: 20, height: 20, style: styles.icon, viewBox: "0 0 24 24" };
    switch (type) {
      case "user":
        return (
          <svg {...common}>
            <path fill="currentColor" d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 1.8-8 4v2h16v-2c0-2.2-3.6-4-8-4z" />
          </svg>
        );
      case "email":
        return (
          <svg {...common}>
            <path fill="currentColor" d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 17.5v-11zM4.5 6L12 11l7.5-5H4.5z" />
          </svg>
        );
      case "lock":
        return (
          <svg {...common}>
            <path fill="currentColor" d="M17 8h-1V6a4 4 0 00-8 0v2H7a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1v-9a1 1 0 00-1-1zm-6 0V6a2 2 0 114 0v2h-4z" />
          </svg>
        );
      case "address":
        return (
          <svg {...common}>
            <path fill="currentColor" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" />
          </svg>
        );
      case "status":
        return (
          <svg {...common}>
            <path fill="currentColor" d="M12 2L15 8l6 .5-4.5 3.5L18 20l-6-4-6 4 1.5-7L3 8.5 9 8 12 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.form, color: "#333" }}>
        <div style={styles.iconBox}>F</div>

        <h2 style={styles.title}>Faculty Sign-Up</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputWrapper}>
            <Icon type="user" />
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <Icon type="email" />
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <Icon type="lock" />
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <Icon type="address" />
            <input
              style={styles.input}
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div style={styles.inputWrapper}>
            <Icon type="status" />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Select Status</option>
              <option value="Professor">Supervisor</option>
              <option value="Assistant Professor">Evaluation Committee Member</option>
              <option value="Lecturer">FYP Committee Member</option>
            </select>
          </div>

          {message && (
            <div
              style={{
                marginTop: 8,
                color: isSuccess ? "#155724" : "#721c24",
                backgroundColor: isSuccess ? "#d4edda" : "#f8d7da",
                padding: "10px",
                borderRadius: 8,
              }}
            >
              {message}
            </div>
          )}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: 16, color: "#333" }}>
          Already have an account?{" "}
          <Link to="/FacLogin" style={{ color: "#4e73df", fontWeight: 600 }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0f7fa, #80deea)",
  },
  form: {
    width: "420px",
    background: "#fff",
    padding: "40px",
    borderRadius: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    textAlign: "center",
    position: "relative",
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "linear-gradient(90deg, #4e73df, #1cc88a)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 24,
    margin: "0 auto 18px",
  },
  title: {
    marginBottom: "18px",
    color: "#4e73df",
    fontSize: "24px",
    fontWeight: "600",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  icon: {
    flex: "0 0 24px",
    color: "#6c757d",
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.2s ease",
  },
  select: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#fff",
    transition: "all 0.2s ease",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    background: "linear-gradient(90deg, #4e73df, #1cc88a)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "18px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
};