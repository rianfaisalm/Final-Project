import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserDetail = () => {
  const [food, setFood] = useState({});
  const param = useParams();

  const getFoodDetail = () => {
    const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJ1c2VySWQiOiIwMDY1Yzg4Mi02OTlkLTRkZmMtYjRkNy0zM2Q5Mzc1M2MxMTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTg1MDA2MDF9.XTbJtGM5o2WSGVPYZTJ-912lkaASdUAiGp5-gs8EbhE";
    const API_KEY = "w05KkI9AWhKxzvPFtXotUva-";

    axios
  .get(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${param.FOOD_ID}`, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
      apiKey: API_KEY,
    },
  })
      .then((res) => {
        console.log("Response API:", res.data);
        const data = res?.data?.data;
        setFood(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFoodDetail();
  }, [param.FOOD_ID]);

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", color: "#000000" }}>Detail Food</h1>
        <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px" }}>
          <h3>{food?.name}</h3>
          <h4>{food?.type}</h4>
          <img style={{ width: "300px" }} src={food?.imageUrl} alt={food?.name} />
          <p>{food?.description}</p>
          <h2>Rp {food?.price}</h2>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDetail;
