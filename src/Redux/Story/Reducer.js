// Import the action types from ActionType
import {
    CREATE_USER_STORY,
    DELETE_STORY,
    FETCH_USER_STORY,
} from "./ActionType";

// Define the initial state for the story reducer
const initialState = {
    createdStories: null, // Placeholder for created stories
    stories: null, // Placeholder for fetched stories
    deletedStory: null, //  Placeholder for a deleted user story
};

// Story reducer function to handle story-related actions
export const StoryReducer = (store = initialState, { type, payload }) => {
    // Check the action type and update the store accordingly
    if (type === CREATE_USER_STORY) {
        // If the action type is for creating a new user story, update the store with the created story payload
        return { ...store, createdStories: payload };
    } else if (type === FETCH_USER_STORY) {
        // If the action type is for fetching user stories, update the store with the fetched stories payload
        return { ...store, stories: payload };
    } else if (type === DELETE_STORY) {
        // If the action type is for deleting a user story, add it to the deletedStory property of the store
        return { ...store, stories: payload };
    }

    // Return the current store if the action type doesn't match any case
    return store;
};
