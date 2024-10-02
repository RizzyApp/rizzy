import React from 'react';
import SwipeDeck from "../components/SwipeDeck.jsx";
import Test from "../components/Test.jsx";

const App = () => {
    const handleSwipe = (direction) => {
        console.log('Swiped:', direction);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Test></Test>
            <SwipeDeck/>
        </div>
    );
};

export default App;
