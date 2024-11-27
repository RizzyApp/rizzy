import {REACT_ROUTES} from "../constants.js";
import {useNavigate} from "react-router-dom";

const MatchNotificationToast = ({notification}) => {

    const navigate = useNavigate()

    return (
        <div className="flex items-center cursor-pointer"
        onClick={() => navigate(REACT_ROUTES.CHAR_BY_USER(notification.userId))}>
            <img
                src={notification.profilePic.url}
                alt={notification.name}
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                }}
                className="w-[40px] h-[40px] rounded-full mr-[10px]"
            />
            <div>
                <strong>You matched with {notification.name}!</strong>
            </div>
        </div>
    );
};

export default MatchNotificationToast;