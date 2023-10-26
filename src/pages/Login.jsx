import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState(""); // Mengganti username menjadi email
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      setErr("Please fill in both email and password fields."); // Mengganti username menjadi email
      return;
    }

    const payload = {
      email: email, // Mengganti username menjadi email
      password: password,
    };

    // JWT Token dan API Key
    const JWT_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpYW5AZ21haWwuY29tIiwidXNlcklkIjoiZmIzYzEyOTUtZDUxOC00OGViLTg5OTQtOWI3c2M2OGJhZDg2Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4MzI4Nzk5fQ.iMvlPGdg8xt87vkieEGDQN73tIRbO0uQvvOEW0vlSJ0";
    const API_KEY = "w05KkI9AWhKxzvPFtXotUva-";

    // Menyertakan JWT Token dan API Key dalam header permintaan
    const config = {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        apiKey: API_KEY,
      },
    };

    axios
      .post("https://api-bootcamp.do.dibimbing.id/api/v1/login", payload, config)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.data.token);
        navigate("/"); // Arahkan ke halaman utama setelah berhasil login
      })
      .catch((err) => {
        console.log(err.message);
        setErr("Login failed. Please check your email and password."); // Mengganti username menjadi email
      });
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };

  const cardStyle = {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px",
  };

  const buttonStyle = {
    padding: "10px 60px",
    margin: "30px",
    background: "#00FF00",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Sign in to your account</h1>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              onChange={handleChangeEmail}
              placeholder="Enter your email" // Mengganti username menjadi email
              style={inputStyle}
            />
            <input
              onChange={handleChangePass}
              placeholder="Enter your password"
              style={inputStyle}
            />
          </div>
          {!!err.length && (
            <h3 style={{ color: "red", textAlign: "center" }}>{err}</h3>
          )}
          <div style={{ textAlign: "center" }}>
            <button onClick={handleSubmit} style={buttonStyle}>
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
