// Import action types from ActionType
import {
    FOLLOW_USER,
    GET_USERS_BY_USER_IDS,
    GET_USER_BY_USERNAME,
    GET_USER_PROFILE,
    SEARCH_USER,
    UPDATE_USER,
} from "./ActionType";
import { USER_API_URL } from "../Config";

// Action creator to fetch user profile
export const getUserProfileAction = (token) => async (dispatch) => {
    try {
        const res = await fetch(`${USER_API_URL}/req`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        const reqUser = await res.json();
        console.log("--- req user --- ", reqUser);
        dispatch({ type: GET_USER_PROFILE, payload: reqUser });
    } catch (error) {
        console.log("catch error - ", error);
    }
};

// Action creator to find user by username
export const findByUsernameAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${USER_API_URL}/username/${data.username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
        });
        const user = await res.json();
        console.log("--- find by username  --- ", user);
        dispatch({ type: GET_USER_BY_USERNAME, payload: user });
    } catch (error) {
        console.log("catch error - ", error);
    }
};

// Action creator to find users by their IDs
export const findByUserIdsAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${USER_API_URL}/m/${data.userIds}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });
        const users = await res.json();
        console.log("--- find by ids  --- ", users);
        dispatch({ type: GET_USERS_BY_USER_IDS, payload: users });
    } catch (error) {
        console.log("catch error -  ", error);
    }
};

// Action creator to follow a user
export const followUserAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${USER_API_URL}/follow/${data.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });
        const users = await res.json();
        console.log("--- follow user --- ", users);
        dispatch({ type: FOLLOW_USER, payload: users });
    } catch (error) {
        console.log("catch error -  ", error);
    }
};

// Action creator to unfollow a user
export const unFollowUserAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${USER_API_URL}/unfollow/${data.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });
        const users = await res.json();
        console.log("--- unfollow user --- ", users);
        dispatch({ type: FOLLOW_USER, payload: users });
    } catch (error) {
        console.log("catch error -  ", error);
    }
};

// Action creator to search for users
export const searchUserAction = (data) => async (dispatch) => {
    console.log("jwt --- ", data.jwt);
    try {
        const res = await fetch(`${USER_API_URL}/search?q=${data.query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });
        const users = await res.json();
        console.log("--- search user --- ", users);
        dispatch({ type: SEARCH_USER, payload: users });
    } catch (error) {
        console.log("catch error -  ", error);
    }
};

// Action creator to edit user details
export const editUserDetailsAction = (data) => async (dispatch) => {
    console.log("data edit user --- ", data);
    try {
        const res = await fetch(`${USER_API_URL}/account/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
            body: JSON.stringify(data.data),
        });
        const users = await res.json();
        console.log("--- updated user --- ", users);
        dispatch({ type: UPDATE_USER, payload: users });
    } catch (error) {
        console.log("catch error -  ", error);
    }
};
