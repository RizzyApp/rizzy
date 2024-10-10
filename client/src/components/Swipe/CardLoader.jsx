import React from "react";
import CardContent from "./CardContent";
import SwipeDeck from "./SwipeDeck";

const db = [
  {
    name: "Mr.Bean",
    url: "./image/bean-1.jpg",
  },
  {
    name: "Mr.Bean",
    url: "./image/bean-2.jpg",
  },
  {
    name: "Mr.Bean",
    url: "./image/bean-3.jpg",
  },
  {
    name: "Mr.Bean",
    url: "./image/bean-4.jpg",
  },
];

function CardLoader() {
  const cards = [
    {
      id: 0,
      content: <CardContent src={db[0].url}></CardContent>,
    },
    {
      id: 1,
      content: <CardContent src={db[1].url}></CardContent>,
    },
    {
      id: 2,
      content: <CardContent src={db[2].url}></CardContent>,
    },
    {
      id: 3,
      content: <CardContent src={db[3].url}></CardContent>,
    },
  ];

  return (
    <div>
      <SwipeDeck initialCards={cards} deckWidth={400}></SwipeDeck>
    </div>
  );
}

export default CardLoader;
