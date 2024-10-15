import React from "react";
import CardContent from "./CardContent";
import SwipeDeck from "./SwipeDeck";

const db = [
  {
    name: "Mr.Bean",
    url: "./image/bean-1.jpg",
    bio: "This is a very cool bio",
  },
  {
    name: "Mr.Bean",
    url: "./image/bean-2.jpg",
    bio: "This is a not so cool bio",
  },
  {
    name: "Mr.Bean",
    url: "./image/bean-3.jpg",
    bio: "This is an okay bio",
  },
  {
    name: "Mr.Bean",
    url: "./image/bean-4.jpg",
    bio: "This is a very bad bio",
  },
];

function CardLoader() {
  const cards = db.map((data, i) => {
    return {
      id: i,
      content: <CardContent src={data.url} name={data.name} bio={data.bio} />,
    };
  });

  return (
    <div>
      <SwipeDeck initialCards={cards} deckWidth={400}></SwipeDeck>
    </div>
  );
}

export default CardLoader;
