import React from "react";
import { useNavigate } from "react-router-dom";

// SearchUserCard component takes in username, image, and setIsSearchVisible as props
const SearchUserCard = ({ username, image, setIsSearchVisible }) => {
    // useNavigate hook from react-router-dom to handle navigation
    const navigate = useNavigate();

    // Function to handle navigation when the user card is clicked
    const handleNavigate = () => {
        navigate(`/${username}`); // Navigate to the route with the username
    };

    return (
        // Clickable div that triggers handleNavigate on click
        <div onClick={handleNavigate} className="py-2 cursor-pointer">
            <div className="flex items-center ">
                {/* User avatar image */}
                <img
                    className="w-10 h-10 rounded-full"
                    src={
                        image
                            ? image
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt=""
                />
                <div className="ml-3">
                    {/* User display name */}
                    <p>{username}</p>
                    <p className="opacity-70">{username}</p>
                </div>
            </div>
        </div>
    );
};

export default SearchUserCard; // Export the SearchUserCard component
