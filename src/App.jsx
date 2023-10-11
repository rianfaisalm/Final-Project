import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { useRoutes } from "react-router";
import UserDetail from "./pages/Userdetail";
import ProtectedRoute from "./routes/Protectedroute";
import Register from "./pages/Register";



function App() {
  const element = useRoutes(routes);

  return element;
}

export default App
