import { useEffect, useState } from 'react';
import SwipeDeck from "./SwipeDeck";

const db = [
  {
    id: 1,
    name: "Mr.Bean",
    src: "./image/bean-1.jpg",
    bio: "This is a very cool bio",
  },
  {
    id: 2,
    name: "Mr.Bean",
    src: "./image/bean-2.jpg",
    bio: "This is a not so cool bio",
  },
  {
    id: 3,
    name: "Mr.Bean",
    src: "./image/bean-3.jpg",
    bio: "This is an okay bio",
  },
  {
    id: 4,
    name: "Mr.Bean",
    src: "./image/bean-4.jpg",
    bio: "This is a very bad bio",
  },
];

function CardLoader() {
  const [users, setUsers] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v1/User');
      if(response.ok){
        const data = await response.json();
        console.log(data);
        setUsers(data);
      }
    }
    fetchData();
  },[]);

  return <SwipeDeck initialCards={db} deckWidth={400}></SwipeDeck>;
}

export default CardLoader;
