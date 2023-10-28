import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { useRoutes } from "react-router";
import "./App.css";
import FoodDetail from "./pages/Fooddetail";
import ProtectedRoute from "./routes/Protectedroute";
import Register from "./pages/Register";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Homepage />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/detail/:FOOD_ID",
    element: (
      <ProtectedRoute>
        <FoodDetail />
      </ProtectedRoute>
    ),
  },
];

function App() {
  const element = useRoutes(routes);

  return element;
}

export default App;
