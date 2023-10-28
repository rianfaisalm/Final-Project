import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
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
      setErr("Please fill in both email and password fields.");
      return;
    }

    const payload = {
      email: email,
      password: password,
    };

    const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYW5nQGdtYWlsLmNvbSIsInVzZXJJZCI6IjkyODE3OTZlLWIzMDQtNDA5Ni05MGQ5LTQ3Mzk2MTYwMDg3NyIsInJvbGUiOiIyIiwiaWF0IjoxNjk4NTA0MjYxfQ.wkoCRz1ctNYd5rgqW7QOPdbO0mDjIVsk0nCrQtCujeQ";

    const API_KEY = "w05KkI9AWhKxzvPFtXotUva-";

    const config = {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        apiKey: API_KEY,
      },
    };

    axios
      .post("https://api-bootcamp.do.dibimbing.id/api/v1/login", payload, config)
      .then((res) => {
        console.log("Response Data:", res.data);

        if (res.data && res.data.token) {
          // Simpan token ke localStorage
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          setErr("Invalid response data");
        }
      })
      .catch((err) => {
        console.error(err); // Tampilkan kesalahan ke konsol
        setErr("Login failed. Please check your email and password.");
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
              placeholder="Enter your email"
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
