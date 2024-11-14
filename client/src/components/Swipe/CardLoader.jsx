import {useEffect, useState} from 'react';
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
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v1/User');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers(data);
        // setUsers(prevUsers => {
        //   if(prevUsers === null) {
        //     setNumberOfUsers(data.length);
        //     return data;
        //   }
        //   const newUsers = [...prevUsers];
        //   newUsers.splice(0, prevUsers.length - 1);
        //   const newData =  [...newUsers, ...data];
        //   setNumberOfUsers(newData.length)
        //   return newData;
        // })
      }
    };
    fetchData();
    // if(numberOfUsers < 2) {
    //   fetchData();
    // }

  }, []);

  const handleSwipeOut = (userId, direction) => {
    const swipeData = {
      swipedUserId: userId,
      swipeType: direction === 1 ? 'right' : 'left',
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(swipeData),
    };

    const response = fetch('api/v1/Swipe', fetchOptions)
  };
  if (!users) {
    return <div>loading...</div>;
  }

  return <SwipeDeck initialCards={users} deckWidth={400} onSwipe={handleSwipeOut} setNumberOfUsers={setNumberOfUsers}></SwipeDeck>;
}

export default CardLoader;
