import { BASE_API_URL } from "../Config";
import { SIGN_IN, SIGN_IN_ERROR, SIGN_UP, SIGN_UP_ERROR } from "./ActionType";

// Action creator function for signing in
export const signinAction = (data) => async (dispatch) => {
    try {
        // Send a GET request to the sign-in endpoint with credentials in the header
        const res = await fetch(`${BASE_API_URL}/signin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Basic " + btoa(data.email + ":" + data.password),
            },
        });

        if (!res.ok) {
            // If response is not okay, throw an error
            throw new Error("Invalid User Name or Password");
        }

        // Extract the JWT token from the response headers
        const token = res.headers.get("Authorization");

        // Store the token in local storage
        localStorage.setItem("token", token);

        // Dispatch an action to update the Redux store with the signed-in user's token
        dispatch({ type: SIGN_IN, payload: token });
    } catch (error) {
        // Log any errors that occur during the sign-in process
        console.log("Error:", error.message);
        dispatch({ type: SIGN_IN_ERROR, payload: error.message });
    }
};

// Action creator function for signing up
export const signupAction = (data) => async (dispatch) => {
    try {
        // Send a POST request to the sign-up endpoint with user data in the body
        const res = await fetch(`${BASE_API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Parse the JSON response to get user data
        const user = await res.json();
        if (!res.ok) {
            // If response is not okay, throw an error
            throw new Error(user.message);
        }
        console.log("Signup:", user);

        // Dispatch an action to update the Redux store with the signed-up user's data
        dispatch({ type: SIGN_UP, payload: user });
    } catch (error) {
        // Dispatch an action to handle the error
        console.log("Error:", error.message);
        dispatch({ type: SIGN_UP_ERROR, payload: error.message });
    }
};
