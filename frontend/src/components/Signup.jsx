import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Configure axios base URL
const API_BASE_URL = "http://localhost:8080";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
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

    // Client-side validation
    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/student/register`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          address: form.address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Enable sending cookies for session
        }
      );

      setIsSuccess(true);
      setMessage(`Signup successful! Your Student ID is: ${response.data.id}. You can now login.`);
      setForm({ name: "", email: "", password: "", address: "" });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        setMessage(error.response.data.message || "Signup failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        setMessage("Network error. Please check if the server is running.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const Icon = ({ type }) => {
    switch (type) {
      case "user":
        return (
          <svg style={styles.icon} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 1.8-8 4v2h16v-2c0-2.2-3.6-4-8-4z"
            />
          </svg>
        );

      case "email":
        return (
          <svg style={styles.icon} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 17.5v-11zM4.5 6L12 11l7.5-5H4.5z"
            />
          </svg>
        );

      case "lock":
        return (
          <svg style={styles.icon} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17 8h-1V6a4 4 0 00-8 0v2H7a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1v-9a1 1 0 00-1-1zm-6 0V6a2 2 0 114 0v2h-4z"
            />
          </svg>
        );

      case "address":
        return (
          <svg style={styles.icon} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconBox}>S</div>

        <h2 style={styles.title}>Student Sign-Up</h2>

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
              required
            />
          </div>

          <button 
            style={styles.button} 
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p style={{
            ...styles.linkText,
            color: isSuccess ? "#2ecc71" : "#e74c3c",
            marginTop: 10
          }}>
            {message}
          </p>
        )}

        <p style={styles.linkText}>
          Already have an account?
          <a href="/Login" style={styles.link}> Login</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f9ff",
    padding: 20,
  },

  card: {
    width: 420,
    background: "white",
    borderRadius: 20,
    padding: "60px 35px 40px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
    position: "relative",
    textAlign: "center",
  },

  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 18,
    background: "linear-gradient(135deg,#427BFF,#3FE0C5)",
    position: "absolute",
    top: -35,
    left: "50%",
    transform: "translateX(-50%)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 34,
    color: "white",
    fontWeight: "bold",
  },

  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 24,
    fontWeight: 600,
    color: "#1c2a4b",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#f3f6fa",
    borderRadius: 12,
    padding: "12px 15px",
    marginBottom: 18,
  },

  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    color: "#334b7d",
  },

  input: {
    width: "100%",
    fontSize: 15,
    border: "none",
    outline: "none",
    background: "transparent",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: 8,
    border: "none",
    background: "linear-gradient(135deg,#427BFF,#3FE0C5)",
    borderRadius: 12,
    fontSize: 18,
    color: "white",
    cursor: "pointer",
  },

  linkText: {
    marginTop: 15,
    fontSize: 14,
    color: "#445",
  },

  link: {
    marginLeft: 5,
    color: "#427BFF",
    fontWeight: "bold",
    cursor: "pointer",
  },
};