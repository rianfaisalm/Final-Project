import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#333",
    padding: "0px",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: "1000",
  };

  const leftLinkStyle = {
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
  };

  const rightLinkStyle = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  };

  const linkMargin = {
    margin: "0 10px",
    color: "#fff",
    textDecoration: "none",
  };

  const logoStyle = {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: "24px",
    margin: "0",
    marginLeft: "20px",
    color: "#ffff",
  };

  const searchStyle = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  };
  
  const searchInputStyle = {
    border: 'none',
    borderRadius: '24px',
    fontSize: '18px', 
    padding: '10px', 
  };
  
  const searchIconStyle = {
    backgroundColor: 'transparent',
    borderRadius: '24px',
    border: 'none',
    fontSize: '24px',
    padding: '10px', 
  };

  return (
    <nav className="max-w-screen-xl px-4 mx-auto" style={navbarStyle}>
      <div style={leftLinkStyle}>
        <Link to={"/"} style={linkMargin}>
          <h2 style={logoStyle}>
          <FontAwesomeIcon icon={faStroopwafel} style={{ marginRight: '8px' }} />
          yummy time
          </h2>
        </Link>
      </div>
      <div style={searchStyle}>
        <div className="input-group navbar-input">
          <input
            type="search"
            className="form-control"
            placeholder="Sekarang Pilih Makanan!!"
            aria-label="Search"
            aria-describedby="basic-addon1"
            style={searchInputStyle}
          />
          <span
            className="input-group-text"
            id="basic-addon1"
            style={searchIconStyle}
          >
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div style={rightLinkStyle}>
        <Link to={"/"} style={linkMargin}>
          <h2>
          <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '8px' }} />
          Recommended
          </h2>
        </Link>
        <Link to={"/register"} style={linkMargin}>
          <h2>Register</h2>
        </Link>
        <Link to={"/login"} style={linkMargin}>
          <h2>Login</h2>
        </Link>
        <button
          onClick={handleLogout}
          style={{
            ...linkMargin,
            padding: "10px 20px",
            margin: "10px",
            background: "#00FF00",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
