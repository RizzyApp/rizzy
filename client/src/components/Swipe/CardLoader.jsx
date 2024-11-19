import {useEffect, useState} from 'react';
import SwipeDeck from './SwipeDeck';
import ENDPOINTS from "../../endpoints.js";
import {useNavigate} from "react-router-dom";

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
            <button onClick={() => navigate("/profile")}>Go to Profile</button>
        </div>
    }


    return <SwipeDeck users={users} setUsers={setUsers} deckWidth={400} onSwipe={handleSwipeOut}></SwipeDeck>;
}

export default CardLoader;
