import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";


const App = () => {
  const user = useSelector((state)=>state.counter.cart)
  console.log("user", user)
 

  return (
    <div>
    <Navbar/>
    </div>
  );
};

export default App;
