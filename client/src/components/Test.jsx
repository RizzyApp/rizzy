import { useSpring,animated } from '@react-spring/web'
import {useEffect, useState} from "react";

export default function Test() {
    const [position, setPosition] = useState(window.innerWidth / 2 - 25); // Horizontal position state
    const [rotation, setRotation] = useState(0);
    const [exists, setExists] = useState(true);

    const boundary = window.innerWidth

    // Create a spring animation for the position
    const styles = useSpring({
        left: position, 
        rotation: 0,
        config: { tension: 170, friction: 26 }, // Spring config for smooth movement
    });

    // Handle key press events for left and right arrows
    const handleKeyPress = (event) => {
        const step = 50; // Pixels to move per key press
        if (event.key === 'ArrowRight') {
            setPosition((prev) => prev + step); // Move to the right
            setRotation(prev => prev -45);
        } else if (event.key === 'ArrowLeft') {
            setPosition((prev) => prev - step); // Move to the left
            setRotation(prev => prev + 45);
        }
    };

    // Check if the object reaches the boundary
    useEffect(() => {
        if (position > boundary || position < -50) {
            setExists(false); // Remove the object if it crosses the boundary
        }
    }, [position, boundary]);

    // Add event listener on component mount, remove on unmount
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    if (!exists) {
        return null; // If the object is removed, return null to cease rendering
    }

    return (
        <animated.div
            style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'tomato',
                position: 'absolute',
                ...styles, // Apply the spring-based animation styles
            }}
        />
    );
}
