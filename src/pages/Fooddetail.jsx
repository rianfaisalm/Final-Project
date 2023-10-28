import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FoodDetail = () => {
  const [food, setFood] = useState({});
  const [isLiked, setIsLiked] = useState(false); // State untuk melacak status like
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
        // Set status "isLiked" berdasarkan hasil dari API
        setIsLiked(data?.likedByCurrentUser || false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fungsi untuk mengirim permintaan "like"
  const handleLike = () => {
    const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJ1c2VySWQiOiIwMDY1Yzg4Mi02OTlkLTRkZmMtYjRkNy0zM2Q5Mzc1M2MxMTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTg1MDA2MDF9.XTbJtGM5o2WSGVPYZTJ-912lkaASdUAiGp5-gs8EbhE";
    const API_KEY = "w05KkI9AWhKxzvPFtXotUva-";

    axios
      .post(
        "https://api-bootcamp.do.dibimbing.id/api/v1/like",
        {
          foodId: param.FOOD_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            apiKey: API_KEY,
          },
        }
      )
      .then((res) => {
        setIsLiked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fungsi untuk mengirim permintaan "unlike"
  const handleUnlike = () => {
    const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJ1c2VySWQiOiIwMDY1Yzg4Mi02OTlkLTRkZmMtYjRkNy0zM2Q5Mzc1M2MxMTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTg1MDA2MDF9.XTbJtGM5o2WSGVPYZTJ-912lkaASdUAiGp5-gs8EbhE";
    const API_KEY = "w05KkI9AWhKxzvPFtXotUva-";

    axios
      .post(
        "https://api-bootcamp.do.dibimbing.id/api/v1/unlike",
        {
          foodId: param.FOOD_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
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
  }, [param.FOOD_ID]);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "20px", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px" }}>
        <h1>{food?.name}</h1>
        <h4>{food?.type}</h4>
        <img style={{ width: "300px" }} src={food?.imageUrl} alt={food?.name} />
        <p>{food?.description}</p>
        <h4>Ingredients:</h4>
        <p>{food?.ingredients?.join(", ")}</p>
        <h4>Rating: {food?.rating}</h4>
        <h4>Total Likes: {food?.totalLikes}</h4>

        {/* Tombol "Like" dan "Unlike" */}
        {isLiked ? (
          <button onClick={handleUnlike}>Unlike</button>
        ) : (
          <button onClick={handleLike}>Like</button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FoodDetail;
