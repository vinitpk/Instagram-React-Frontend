import {
    CREATE_NEW_POST,
    DELETE_POST,
    GET_SINGLE_POST,
    GET_USER_POST,
    LIKE_POST,
    REQ_USER_POST,
    SAVE_POST,
    UNSAVE_POST,
} from "./ActionType";

const initialState = {
    createdPost: null,
    userPost: [],
    reqUserPost: [],
    savePost: null,
    unsavePost: null,
    singlePost: null,
    deletedPost: null,
};

export const postReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_NEW_POST:
            return { ...state, createdPost: payload };
        case GET_USER_POST:
            return { ...state, userPost: payload };
        case LIKE_POST:
            return { ...state, likePost: payload };
        case REQ_USER_POST:
            return { ...state, reqUserPost: payload };
        case SAVE_POST:
            return { ...state, savePost: payload };
        case UNSAVE_POST:
            return { ...state, unsavePost: payload };
        case GET_SINGLE_POST:
            return { ...state, singlePost: payload };
        case DELETE_POST:
            return { ...state, deletedPost: payload };
        default:
            return state;
    }
};
