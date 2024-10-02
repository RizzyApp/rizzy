import React, {useRef, useState} from 'react';

const SwipeCard = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const cardRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setCurrentX(e.pageX);
        const distance = currentX - startX;
        if (cardRef.current) {
            cardRef.current.style.transform = `translateX(${distance}px)`;
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            const distance = currentX - startX;
            if (Math.abs(distance) > 100) {
                console.log(distance > 0 ? 'Accepted' : 'Rejected')
            } else {
                if (cardRef.current) {
                    cardRef.current.style.transform = '';
                }
            }
        }
    };

    return (
        <div
            className="w-72 h-96 bg-blue-300 rounded-lg shadow-lg transition-transform duration-300 relative cursor-grab active:cursor-grabbing"
            ref={cardRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // To handle mouse leaving the card
        >
        </div>
    );
};

export default SwipeCard;