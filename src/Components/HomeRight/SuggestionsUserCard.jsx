// Import React and the necessary hook from react-router-dom
import React from "react";
import { useNavigate } from "react-router-dom";

// Define a functional component 'SuggestionsUserCard' that takes image, username, and description as props
const SuggestionsUserCard = ({ image, username, description }) => {
    // Get the navigate function from useNavigate hook
    const navigate = useNavigate();

    // Function to handle following a user and navigate to their profile
    const handleFollowUser = () => {
        navigate(`/${username}`); // Navigate to the profile page of the user when clicked
    };

    // Return the JSX representing the user card with follow functionality
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <img className="w-9 h-9 rounded-full" src={image} alt="" />
                <div className="ml-2">
                    <p className="text-sm font-semibold">{username}</p>
                    <p className="text-sm font-semibold opacity-70">
                        {description}
                    </p>
                </div>
            </div>
            <span
                className="text-blue-700 text-sm font-semibold cursor-pointer"
                onClick={handleFollowUser}
            >
                Follow
            </span>
        </div>
    );
};

// Export the SuggestionsUserCard component as default
export default SuggestionsUserCard;
