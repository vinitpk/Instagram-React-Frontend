// Import necessary libraries and components
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../Config/Debounce"; // Import debounce function
import { searchUserAction } from "../../Redux/User/Action"; // Import searchUserAction
import "./SearchComponent.css"; // Import CSS file
import SearchUserCard from "./SearchUserCard"; // Import SearchUserCard component

// Define SearchComponent functional component
const SearchComponent = ({ setIsSearchVisible }) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    // Get user data from Redux store
    const { user } = useSelector((store) => store);
    // Initialize dispatch function
    const dispatch = useDispatch();

    // Function to handle search user action
    const handleSearchUser = (query) => {
        const data = {
            jwt: token,
            query,
        };
        dispatch(searchUserAction(data)); // Dispatch searchUserAction with data
    };

    // Debounce the handleSearchUser function by 1000ms
    const debouncedHandleSearchUser = debounce(handleSearchUser, 1000);

    // Render the SearchComponent UI
    return (
        <div className="search-container">
            <div className="px-3 pb-5">
                <h1 className="text-xl pb-5">Search</h1>

                <input
                    onChange={(e) => debouncedHandleSearchUser(e.target.value)}
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                />
            </div>

            <hr />
            <div className="px-3 pt-5">
                {user.searchResult.map((item) => (
                    <SearchUserCard
                        setIsSearchVisible={setIsSearchVisible}
                        key={item.id}
                        username={item.username}
                        image={item?.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;
