import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

const Homepage = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  const getAllFoods = () => {
    const JWT_TOKEN = "your_jwt_token";
    const API_KEY = "your_api_key";

    axios
      .get("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
          apiKey: API_KEY,
        },
      })
      .then((res) => {
        console.log("Response API:", res.data);
        const data = res?.data?.item?.find((item) => item.name === "Get All Foods")?.response || [];
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

  return (
    <>
        <Navbar />
        <div>
        <h1>Ini Homepage</h1>
        {foods.map((food, key) => (
            <div key={key} style={{ marginBottom: "40px" }}>
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <img src={food.imageUrl} alt={food.name} style={{ maxWidth: '100%' }} />
            <button onClick={() => handleDetail(food.id)}>Detail</button>
            </div>
        ))}
        </div>
        <Footer />
    </>
  );
};

export default Homepage;
