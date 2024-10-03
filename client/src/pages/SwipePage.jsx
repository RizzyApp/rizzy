import React from "react";
import SwipeDeck from "../components/Swipe/SwipeDeck.jsx";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SwipeDeck />
      <button
        onClick={() => navigate("/")}
        className="absolute bottom-0 right-0"
      >
        Back to HomePage
      </button>
    </div>
  );
};

export default App;
