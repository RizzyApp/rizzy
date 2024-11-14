import { useEffect, useState } from 'react';
import SwipeDeck from './SwipeDeck';

const db = [
  {
    id: 1,
    name: 'Mr.Bean',
    photos: [],
    bio: 'This is a very cool bio',
    age: 30,
    distance: 34,
  },
  {
    id: 2,
    name: 'Mr.Bean',
    photos: ['./image/bean-1.jpg', './image/bean-2.jpg', './image/bean-3.jpg', './image/bean-3.jpg', './image/bean-4.jpg'],
    bio: 'This is a not so cool bio',
    age: 30,
    distance: 34,
  },
  {
    id: 3,
    name: 'Mr.Bean',
    photos: [],
    bio: 'This is an okay bio',
    age: 30,
    distance: 34,
  },
  {
    id: 4,
    name: 'Mr.Bean',
    photos: ['./image/bean-1.jpg', './image/bean-2.jpg', './image/bean-3.jpg', './image/bean-3.jpg', './image/bean-4.jpg'],
    bio: 'This is a very bad bio',
    age: 30,
    distance: 34,
  },
];

function CardLoader() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v1/User');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  if(!users){
    return <div>loading...</div>
  }

  return <SwipeDeck initialCards={users} setInitialCards={setUsers} deckWidth={400}></SwipeDeck>;
}

export default CardLoader;
