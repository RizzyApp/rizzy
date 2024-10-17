import React from "react";
import SwipeDeck from "../components/Swipe/SwipeDeck.jsx";
import { useNavigate } from "react-router-dom";
import CardLoader from "../components/Swipe/CardLoader.jsx";
import Header from "../components/Header.jsx";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-grow items-center bg-custom-gradient justify-center">
        <CardLoader></CardLoader>
      </div>
      <button
        onClick={() => navigate("/")}
        className="absolute bottom-0 right-0 text-white"
      >
        Back to HomePage
      </button>
    </div>
  );
};

export default App;
