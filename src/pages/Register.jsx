import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState(""); // Tambahkan state untuk passwordRepeat
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordRepeat = (e) => { // Handler perubahan untuk passwordRepeat
    setPasswordRepeat(e.target.value);
  };

  const handleSubmit = () => {
    if (password !== passwordRepeat) {
      setErr("Password and password repeat do not match.");
      return;
    }

    const payload = {
      name: name,
      email: email,
      password: password,
      passwordRepeat: passwordRepeat, // Tambahkan passwordRepeat ke objek payload
      role: "2",
    };

    const config = {
      headers: {
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
      },
    };

    axios
      .post("https://api-bootcamp.do.dibimbing.id/api/v1/register", payload, config)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setErr("Registration failed. Please check your information.");
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
          <h1 style={titleStyle}>Register</h1>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              onChange={handleChangeName}
              placeholder="Enter your name"
              style={inputStyle}
            />
            <input
              onChange={handleChangeEmail}
              placeholder="Enter your email"
              style={inputStyle}
            />
            <input
              onChange={handleChangePassword}
              placeholder="Enter your password"
              style={inputStyle}
              type="password"
            />
            <input
              onChange={handleChangePasswordRepeat}
              placeholder="Repeat your password" // Tambahkan input untuk password repeat
              style={inputStyle}
              type="password"
            />
          </div>
          {!!err.length && (
            <h3 style={{ color: "red", textAlign: "center" }}>{err}</h3>
          )}
          <div style={{ textAlign: "center" }}>
            <button onClick={handleSubmit} style={buttonStyle}>
              Register
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
