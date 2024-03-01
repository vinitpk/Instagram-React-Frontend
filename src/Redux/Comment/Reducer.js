import { CREATE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT } from "./ActionType";

// Initial state for the comment reducer
const initialState = {
    createdComment: null,
    postComments: null,
    likedComment: null,
};

// Comment reducer function
export const commentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_COMMENT:
            return { ...state, createdComment: payload };
        case GET_POST_COMMENT:
            return { ...state, postComments: payload };
        case LIKE_COMMENT:
            return { ...state, likedComment: payload };
        default:
            return state;
    }
};
