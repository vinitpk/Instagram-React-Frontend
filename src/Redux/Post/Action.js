import {
    CREATE_NEW_POST,
    DELETE_POST,
    GET_SINGLE_POST,
    GET_USER_POST,
    LIKE_POST,
    REQ_USER_POST,
    SAVE_POST,
    UNLIKE_POST,
    UNSAVE_POST,
} from "./ActionType";
import { POST_API_URL } from "../Config";

// Action creator to create a new post
export const createPost = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${POST_API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
            body: JSON.stringify(data.data),
        });
        const resData = await res.json();
        console.log("Created post:", resData);
        dispatch({ type: CREATE_NEW_POST, payload: resData });
    } catch (error) {
        console.log("Error:", error);
    }
};

// Action creator to fetch posts of users followed by the current user
export const findUserPost = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${POST_API_URL}/following/${data.userIds}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
        });
        const resData = await res.json();
        console.log("User posts:", resData);
        dispatch({ type: GET_USER_POST, payload: resData });
    } catch (error) {
        console.log("Error:", error);
    }
};

// Action creator to fetch posts of a specific user
export const reqUserPostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${POST_API_URL}/following/${data.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
        });
        const resData = await res.json();
        console.log("User posts:", resData);
        dispatch({ type: REQ_USER_POST, payload: resData });
    } catch (error) {
        console.log("Error:", error);
    }
};

// Action creator to like a post
export const likePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${POST_API_URL}/like/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
            body: JSON.stringify(data.data),
        });
        const resData = await res.json();
        console.log("Liked post:", resData);
        dispatch({ type: LIKE_POST, payload: resData });
    } catch (error) {
        console.log("Error:", error);
    }
};

// Action creator to unlike a post
export const unLikePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${POST_API_URL}/unlike/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
            body: JSON.stringify(data.data),
        });
        const resData = await res.json();
        console.log("Unliked post:", resData);
        dispatch({ type: UNLIKE_POST, payload: resData });
    } catch (error) {
        console.log("Error:", error);
    }
};

// Action creator to save a post
export const savePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${POST_API_URL}/save-post/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
        });
        const savedPost = await res.json();
        console.log("Saved post:", savedPost);
        dispatch({ type: SAVE_POST, payload: savedPost });
    } catch (error) {
        console.log("Error:", error);
    }
};

// Action creator to unsave a post
export const unSavePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${POST_API_URL}/unsave-post/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
        });
        const unSavedPost = await res.json();
        console.log("Unsaved post:", unSavedPost);
        dispatch({ type: UNSAVE_POST, payload: unSavedPost });
    } catch (error) {
        console.log("Error:", error);
    }
};

// Action creator to fetch a single post by its ID
export const findPostByIdAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${POST_API_URL}/${data.postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
        });
        const post = await res.json();
        console.log("Post:", post);
        dispatch({ type: GET_SINGLE_POST, payload: post });
    } catch (error) {
        console.log("Error:", error);
    }
};

// Action creator to delete a post
export const deletePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${POST_API_URL}/delete/${data.postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
            },
        });
        const deletedPost = await res.json();
        console.log("Deleted post:", deletedPost);
        dispatch({ type: DELETE_POST, payload: deletedPost });
    } catch (error) {
        console.log("Error:", error);
    }
};
