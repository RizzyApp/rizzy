import {useEffect, useRef, useState} from "react";
import {animated} from "@react-spring/web";

import SwipeDebugInfo from "./SwipeDebugInfo";
import SwipeCardContent from "./swipeCard/SwipeCardContent";
import useSwipeAnimationHandler from "./hooks/useSwipeAnimationHandler.js";

const FIRST_CARD_INDEX = 0;
const MAX_Z_INDEX = 100;
const IS_DEVELOPMENT = import.meta.env.DEV;

const SwipeDeck = ({users, setUsers, deckWidth, onSwipe}) => {
    const swipeCardRef = useRef(null);
    const cardImageRef = useRef(null);

    const onSwipeOut = (direction) => {
        setUsers((prevCards) => {
            console.log("BEFORE THE SWIPE!");
            console.log(prevCards);
            onSwipe(prevCards[0].id,direction);
            return prevCards.slice(1)
        });
    };

    const { bind, swipeDebugInfo, reset: resetAnimation, animatedStyles, y } = useSwipeAnimationHandler(deckWidth, onSwipeOut, cardImageRef);

    useEffect(() => {
        console.log("Component rendered or re-rendered");
    });

    useEffect(() => {
        resetAnimation();
    }, [users]);



    const renderCards = () =>
        users.map((user, index, arr) => (
            <animated.div
                ref={index === FIRST_CARD_INDEX ? swipeCardRef : null}
                key={index}
                {...(index === FIRST_CARD_INDEX ? bind() : {})}
                style={{
                    touchAction: "none",
                    position: "absolute",
                    zIndex:
                        index === FIRST_CARD_INDEX ? MAX_Z_INDEX : arr.length - index,
                    ...(index === FIRST_CARD_INDEX ? animatedStyles : {}),
                }}
            >
                <SwipeCardContent
                    cardData={user}
                    y={y}
                    active={index === FIRST_CARD_INDEX}
                    ref={index === FIRST_CARD_INDEX ? cardImageRef : null}
                />
            </animated.div>
        ));

    return (
        <div className="relative h-full flex flex-col items-center justify-center">
            {renderCards()}
            {IS_DEVELOPMENT && (
                <SwipeDebugInfo swipeDebugInfo={swipeDebugInfo}/>
            )}
        </div>
    );
};

export default SwipeDeck;
