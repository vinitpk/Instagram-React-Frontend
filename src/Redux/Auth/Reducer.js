import { SIGN_IN, SIGN_UP } from "./ActionType";

// Initial state for the authentication reducer
const initialState = {
    signup: null, // Holds data related to user sign-up
    signin: null, // Holds data related to user sign-in
};

// Reducer function for handling authentication actions
export const AuthReducer = (state = initialState, action) => {
    // Destructure action type and payload
    const { type, payload } = action;

    // Check the action type and update the state accordingly
    switch (type) {
        case SIGN_IN:
            return { ...state, signin: payload }; // Update signin data
        case SIGN_UP:
            return { ...state, signup: payload }; // Update signup data
        default:
            return state; // Return current state if action type does not match
    }
};
