import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FoodDetail = () => {
  const [food, setFood] = useState({});
  const [isLiked, setIsLiked] = useState(false); // State untuk melacak status like
  const param = useParams();

  const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJ1c2VySWQiOiIwMDY1Yzg4Mi02OTlkLTRkZmMtYjRkNy0zM2Q5Mzc1M2MxMTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTg1MDA2MDF9.XTbJtGM5o2WSGVPYZTJ-912lkaASdUAiGp5-gs8EbhE";
  const API_KEY = "w05KkI9AWhKxzvPFtXotUva-";

  const getFoodDetail = () => {
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

  const handleLike = () => {
    axios
      .post(
        "https://api-bootcamp.do.dibimbing.id/api/v1/like",
        {
          foodId: param.FOOD_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`, // Pastikan token sesuai dengan akun yang terautentikasi
            apiKey: API_KEY,
          },
        }
      )
      .then((res) => {
        // Periksa respons dari server dan atur status "like" sesuai dengan respons
        if (res.data && res.data.status === "CONFLICT") {
          console.log("Food already liked");
        } else {
          setIsLiked(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const handleUnlike = () => {
    axios
      .post(
        "https://api-bootcamp.do.dibimbing.id/api/v1/unlike",
        {
          foodId: param.FOOD_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`, // Pastikan token sesuai dengan akun yang terautentikasi
            apiKey: API_KEY,
          },
        }
      )
      .then((res) => {
        setIsLiked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    getFoodDetail();
    checkLikedStatus(); // Fungsi untuk mengambil status "like" dari API
  }, [param.FOOD_ID]);
  
  const checkLikedStatus = () => {
    axios
      .get(`https://api-bootcamp.do.dibimbing.id/api/v1/check-like/${param.FOOD_ID}`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
          apiKey: API_KEY,
        },
      })
      .then((res) => {
        setIsLiked(res.data.status === "LIKED");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "60px", marginBottom: "10px", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "100px" }}>
        <div style={{ marginTop: "80px",flex: 1, marginRight: "20px" }}>
          <img style={{ width: "100%" }} src={food?.imageUrl} alt={food?.name} />
        </div>
        <div style={{ flex: 1 }}>
          <h1>{food?.name}</h1>
          <h2>Rating: {food?.rating}</h2>
          <h4>{food?.type}</h4>
          <p>{food?.description}</p>
          <h4>Ingredients:</h4>
          <p>{food?.ingredients?.join(", ")}</p>
          <h4>Give Your Expression :</h4>

          {/* Tombol "Like" dan "Unlike" */}
        {isLiked ? (
          <button onClick={handleUnlike} style={{ marginRight: "10px", background: "#000099",color: "#fff"}}>Unlike</button>
        ) : (
          <button onClick={handleLike} style={{ marginRight: "10px", background: "#3399FF",color: "#fff"}}>Like</button>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FoodDetail;
