import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

const Homepage = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  const getAllFoods = () => {
    const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJ1c2VySWQiOiIwMDY1Yzg4Mi02OTlkLTRkZmMtYjRkNy0zM2Q5Mzc1M2MxMTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTg1MDA2MDF9.XTbJtGM5o2WSGVPYZTJ-912lkaASdUAiGp5-gs8EbhE";
    const API_KEY = "w05KkI9AWhKxzvPFtXotUva-";

    axios
      .get("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
          apiKey: API_KEY,
        },
      })
      .then((res) => {
        console.log("Response API:", res.data);
        const data = res?.data?.data;
        setFoods(data);
  })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  const cardStyle = {
    width: "18rem",
    margin: "0 auto",
    border: "2px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };
  
  const imageStyle = {
    height: "10rem",
    objectFit: "cover", 
    borderRadius: "10px 10px 0 0", 
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginTop: "80px", marginBottom: "20px", fontSize: "36px", color: "black" }}>
          Hello! Yummy Time
        </h1>

        <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
          {foods.map((food, key) => (
            <div
              key={key}
              className="col-lg-4 col-md-6 col-sm-12 col-12"
              style={{ marginBottom: "20px", flex: "0 0 33.33%" }}
            >
              <div className="card" style={cardStyle}>
                <img
                  className="card-img-top"
                  alt="..."
                  style={imageStyle}
                  src={food?.imageUrl}
                />
                <div className="card-body">
                <h5 className="card-title">{food.type}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{food.name}</h6>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      onClick={() => handleDetail(food.id)}
                      className="btn btn-primary"
                      style={{ marginRight: "10px" }}
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
