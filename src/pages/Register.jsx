import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const payload = {
      name: name,
      username: userName,
      password: password,
      roleId: 2,
    };

    axios
      .post("https://api.mudoapi.tech/register", payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        localStorage.setItem("token", "abcdefege");
        navigate("/");
        console.log(err.message);
        setErr(err.message);
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
              onChange={handleChangeUserName}
              placeholder="Enter your username"
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
