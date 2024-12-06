import React from "react";
import Navbar from "./Component/Navbar";
import { useSelector } from "react-redux";
import Login from "./Component/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const App = () => {
  const user = useSelector((state) => state.counter.cart)
  console.log("user", user)


  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />

      </Routes>
      {/* <Navbar/>
    <Login/> */}
    </div>
  );
};

export default App;
