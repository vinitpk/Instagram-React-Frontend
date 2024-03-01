// Import necessary constants and action types from Config and ActionType files
import { STORY_API_URL } from "../Config";
import {
    CREATE_USER_STORY,
    DELETE_STORY,
    FETCH_FOLLOWING_USER_STORY,
    FETCH_USER_STORY,
} from "./ActionType";

// Action creator to create a new user story
export const createUserStory = (data) => async (dispatch) => {
    try {
        // Send a POST request to the server to create a new user story
        const res = await fetch(`${STORY_API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
            body: JSON.stringify(data.data),
        });

        // Extract the response data
        const resData = await res.json();

        // Dispatch an action with the created story payload
        dispatch({ type: CREATE_USER_STORY, payload: resData });

        // Log the created story data
        console.log("Created story:", resData);
    } catch (error) {
        // Log any errors that occur during the process
        console.log("Error:", error);
    }
};

// Action creator to fetch stories of users the current user is following
export const findFollowingUserStory = (data) => async (dispatch) => {
    try {
        // Send a GET request to the server to fetch following users' stories
        const res = await fetch(`${STORY_API_URL}/f/${data.userIds}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });

        // Extract the response data containing stories
        const stories = await res.json();

        // Dispatch an action with the fetched stories payload
        dispatch({ type: FETCH_FOLLOWING_USER_STORY, payload: stories });
    } catch (error) {
        // Log any errors that occur during the process
        console.log("Error:", error);
    }
};

// Action creator to fetch stories of a specific user by their user ID
export const findStoryByUserId = (data) => async (dispatch) => {
    try {
        // Send a GET request to the server to fetch stories of a specific user
        const res = await fetch(`${STORY_API_URL}/${data.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });

        // Extract the response data containing stories
        const stories = await res.json();

        // Dispatch an action with the fetched stories payload
        dispatch({ type: FETCH_USER_STORY, payload: stories });

        // Log the fetched stories data
        console.log("Stories:", stories);
    } catch (error) {
        // Log any errors that occur during the process
        console.log("Error:", error);
    }
};

// Action creator to delete a story
export const deleteStoryAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${STORY_API_URL}/delete/${data.storyId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
        });
        const deletedStory = await res.json();
        console.log("Deleted story:", deletedStory);
        dispatch({ type: DELETE_STORY, payload: deletedStory });
    } catch (error) {
        console.log("Error:", error);
    }
};
