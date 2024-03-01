import { COMMENT_API_URL } from "../Config";
import { CREATE_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType";

// Action creator to create a new comment
export const createComment = (data, callback) => async (dispatch) => {
    try {
        const res = await fetch(`${COMMENT_API_URL}/create/${data.postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
            body: JSON.stringify(data.data),
        });
        const createdComment = await res.json();
        console.log("Created comment:", createdComment);
        if (callback) {
            callback(createdComment); // Pass the created comment to the callback function
        }
        dispatch({ type: CREATE_COMMENT, payload: createdComment });
    } catch (error) {
        console.error("Error creating comment:", error);
    }
};

// Action creator to fetch comments for a specific post
export const findPostComment = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${COMMENT_API_URL}/${data.postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });
        const postComments = await res.json();
        dispatch({ type: "GET_USER_POST", payload: postComments });
    } catch (error) {
        console.error("Error fetching post comments:", error);
    }
};

// Action creator to like a comment
export const likeComment = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${COMMENT_API_URL}/${data.commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
            body: JSON.stringify(data.data),
        });
        const likedComment = await res.json();
        console.log("Liked comment:", likedComment);
        dispatch({ type: LIKE_COMMENT, payload: likedComment });
    } catch (error) {
        console.error("Error liking comment:", error);
    }
};

// Action creator to unlike a comment
export const unLikeComment = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${COMMENT_API_URL}/${data.commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
            body: JSON.stringify(data.data),
        });
        const unlikedComment = await res.json();
        console.log("Unliked comment:", unlikedComment);
        dispatch({ type: UNLIKE_COMMENT, payload: unlikedComment });
    } catch (error) {
        console.error("Error unliking comment:", error);
    }
};
