import {useEffect, useState, useRef} from 'react';
import SwipeCard from './SwipeCard';
const db = [
  {
      name: 'Mr.Bean',
      url: './image/bean-1.jpg'
  },
  {
      name: 'Mr.Bean',
      url: './image/bean-2.jpg'
  },
  {
      name: 'Mr.Bean',
      url: './image/bean-3.jpg'
  },
  {
      name: 'Mr.Bean',
      url: './image/bean-4.jpg'
  },
]

const SwipeDeck = ({className}) => {
  const cardRef = useRef(null); // Ref to get SwipeCard size
  const [cardWidth, setCardWidth] = useState(0); // State to store card width

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth); //Boundary will be the width of the card
    }
  }, [cardRef]);

  return (
    <div className={className}>
      <SwipeCard classname={"w-60 h-[400px] bg-white border rounded-lg flex items-center justify-center cursor-grab overflow-hidden"}
      ref={cardRef}
      deckWidth = {cardWidth * 1.5}>
        <img
          src={db[0].url}
          alt="Placeholder"
          className='w-36 h-full object-cover pointer-events-none'
        />
      </SwipeCard>
    </div>
  );
};

export default SwipeDeck;
