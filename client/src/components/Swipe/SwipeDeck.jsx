import {useEffect, useRef} from "react";
import {animated} from "@react-spring/web";

import useSwipeDeckManager from "./hooks/useSwipeDeckManager";
import SwipeDebugInfo from "./SwipeDebugInfo";
import SwipeCardContent from "./swipeCard/SwipeCardContent";

const FIRST_CARD_INDEX = 0;
const MAX_Z_INDEX = 100;
const IS_DEVELOPMENT = import.meta.env.DEV;

const SwipeDeck = ({users, setUsers, deckWidth, onSwipe}) => {
    const swipeCardRef = useRef(null);
    const cardImageRef = useRef(null);

    const {bind, swipeDebugInfo, animatedStyles, y} =
        useSwipeDeckManager(setUsers, deckWidth, cardImageRef, onSwipe);

    useEffect(() => {
        console.log("Component rendered or re-rendered");
    });

    const renderCards = () =>
        users.map((user, index) => (
            <animated.div
                ref={index === FIRST_CARD_INDEX ? swipeCardRef : null}
                key={index}
                {...(index === FIRST_CARD_INDEX ? bind() : {})}
                style={{
                    touchAction: "none",
                    position: "absolute",
                    zIndex:
                        index === FIRST_CARD_INDEX ? MAX_Z_INDEX : users.length - index,
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
