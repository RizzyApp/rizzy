import {useEffect, useState} from 'react';
import SwipeDeck from './SwipeDeck';
import {API_ENDPOINTS, REACT_ROUTES} from "../../constants.js";
import {useNavigate} from "react-router-dom";
import {useFetchWithAuth} from "../../hooks/useFetchWIthCredentials.js";
import { ThreeDots } from 'react-loader-spinner';
import Loading from '../Loading.jsx';

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


function CardLoader() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [noMoreUsers, setNoMoreUsers] = useState(false);
    const [swipedUserIds, setSwipedUserIds] = useState([]);
    const [error, setError] = useState(false); //TODO: Show actual error messages for users
    const navigate = useNavigate();
    const fetchWithAuth = useFetchWithAuth();

    useEffect(() => {
        console.log("CardLoader renders!");
    });

    useEffect(() => {
        if ((!users || users.length < 2) && !loading && !noMoreUsers && !error) {
            fetchData();
        }

    }, [users, loading]);

    const deleteSwipes = async () => {
        const options = {
            "method": "DELETE"
        }
        await fetchWithAuth(API_ENDPOINTS.SWIPE.DELETE_SWIPES, options);
        window.location.reload();
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(API_ENDPOINTS.USERS.GET_SWIPE_USERS);
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
                setError(true);
            }
        } catch (error) {
            setError(true);
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
            const response = await fetchWithAuth(API_ENDPOINTS.SWIPE.POST_SWIPE, fetchOptions);

        } catch (error) {
            console.error('Error swiping user:', error);
        }
    };

    if (!users) {
        return (<Loading/>)
    }

    if (users.length < 1 && noMoreUsers) {
        return <div>
            <div>We could not find any users, please change your preferences in the Profile page!</div>
            <button className="text-white" onClick={() => navigate(REACT_ROUTES.PROFILE)}>Go to Profile</button>
            <br/>
            {IS_DEVELOPMENT && <button className="text-white mt-4" onClick={deleteSwipes}>DELETE SWIPES</button>}
        </div>
    }


    return <>
        <SwipeDeck users={users} setUsers={setUsers} deckWidth={400} onSwipe={handleSwipeOut}></SwipeDeck>
        {IS_DEVELOPMENT &&
            <button className=" fixed left-0 top-1/3 text-white" onClick={deleteSwipes}>DELETE SWIPES</button>}
    </>
}

export default CardLoader;
