// Import action types from ActionType
import {
    GET_USERS_BY_USER_IDS,
    GET_USER_BY_USERNAME,
    GET_USER_PROFILE,
    SEARCH_USER,
    UPDATE_USER,
} from "./ActionType";

// Define initial state for the user reducer
const initialState = {
    reqUser: null,
    findByUsername: null,
    searchResult: [],
    updatedUser: null,
    userByIds: [],
};

// Define the user reducer function
export const userReducer = (store = initialState, { type, payload }) => {
    // Handle different action types
    if (type === GET_USER_PROFILE) {
        // Update state with user profile data
        return { ...store, reqUser: payload };
    } else if (type === GET_USER_BY_USERNAME) {
        // Update state with user found by username
        return { ...store, findByUsername: payload };
    } else if (type === GET_USERS_BY_USER_IDS) {
        // Update state with users found by their IDs
        return { ...store, userByIds: payload };
    } else if (type === SEARCH_USER) {
        // Update state with search results for users
        return { ...store, searchResult: payload };
    } else if (type === UPDATE_USER) {
        // Update state with the updated user data
        return { ...store, updatedUser: payload };
    }

    // Return the current state if the action type doesn't match
    return store;
};
