import React from 'react';
import SwipeDeck from "../components/Swipe/SwipeDeck.jsx";

const App = () => {
    const handleSwipe = (direction) => {
        console.log('Swiped:', direction);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <SwipeDeck/>
        </div>
    );
};

export default App;
