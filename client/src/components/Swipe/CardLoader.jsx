import {useEffect, useState} from 'react';
import SwipeDeck from './SwipeDeck';
import ENDPOINTS from "../../endpoints.js";
import {useNavigate} from "react-router-dom";

const IS_DEVELOPMENT = import.meta.env.DEV;

const mergeUniqueUsersBasedOnId = (previous, current, otherIdsToExclude) => {
    const userIds = new Map();
    const combined = previous ? [...previous, ...current] : current;
    combined.forEach(user => {
        if (!otherIdsToExclude.includes(user.id)) {
            userIds.set(user.id, user);
        }
    });


    return Array.from(userIds.values());
};

const deleteSwipes = async () => {
    const options = {
        "method": "DELETE"
    }
    await fetch(ENDPOINTS.USER.DELETE_SWIPES, options);
    window.location.reload();
}


function CardLoader() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [noMoreUsers, setNoMoreUsers] = useState(false);
    const [swipedUserIds, setSwipedUserIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("CardLoader renders!");
    });

    useEffect(() => {
        if ((!users || users.length < 2)  && !loading && !noMoreUsers) {
            fetchData();
        }

    }, [users, loading]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(ENDPOINTS.USERS.GET_SWIPE_USERS);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data.length < 2) {
                    setNoMoreUsers(true);
                }
                setUsers(prevUsers => {
                    const newUsers = mergeUniqueUsersBasedOnId(prevUsers, data, swipedUserIds);
                    return newUsers;
                });

            } else {
                console.error('Failed to fetch users', response.status);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };

    const handleSwipeOut = async (userId, direction) => {
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

        try {
            setSwipedUserIds(prev => [...prev, userId]);
            const response = await fetch(ENDPOINTS.SWIPE.POST_SWIPE, fetchOptions);

        } catch (error) {
            console.error('Error swiping user:', error);
        }
    };

    if (!users) {
        return <div>loading...</div>;
    }

    if (users.length < 1 && noMoreUsers) {
        return <div>
            <div>We could not find any users, please change your preferences in the Profile page!</div>
            <button className="text-white" onClick={() => navigate("/profile")}>Go to Profile</button>
            <br/>
            {IS_DEVELOPMENT && <button className="text-white mt-4" onClick={deleteSwipes}>DELETE SWIPES</button>}
        </div>
    }


    return <>
        <SwipeDeck users={users} setUsers={setUsers} deckWidth={400} onSwipe={handleSwipeOut}></SwipeDeck>
        {IS_DEVELOPMENT && <button className=" fixed left-0 top-1/3 text-white" onClick={deleteSwipes}>DELETE SWIPES</button>}
    </>
}

export default CardLoader;
