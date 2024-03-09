import { SIGN_IN, SIGN_IN_ERROR, SIGN_UP, SIGN_UP_ERROR } from "./ActionType";

// Initial state for the authentication reducer
const initialState = {
    signup: null, // Holds data related to user sign-up
    signin: null, // Holds data related to user sign-in
    signupError: null , // Error message if there is an error during sign up process
    signinError: null , // Error message if there is an error during sign in process
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
        case SIGN_UP_ERROR:
            return { ...state, signupError: payload }; // Set signup error message
            case SIGN_IN_ERROR:
                return { ...state, signinError: payload }; // Set signup error message
        default:
            return state; // Return current state if action type does not match
    }
};
