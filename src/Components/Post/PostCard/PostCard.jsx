// Import necessary packages and components
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
    BsBookmark,
    BsBookmarkFill,
    BsDot,
    BsEmojiSmile,
    BsThreeDots,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDisclosure, useToast } from "@chakra-ui/react";
import CommentModal from "../../Comment/CommentModal";
import { createComment } from "../../../Redux/Comment/Action";
import {
    deletePostAction,
    likePostAction,
    savePostAction,
    unLikePostAction,
    unSavePostAction,
} from "../../../Redux/Post/Action";
import {
    isPostLikedByUser,
    isReqUserPost,
    isSavedPost,
} from "../../../Config/Logic";

// Import CSS file
import "./PostCard.css";

// Define the PostCard component
const PostCard = ({
    userProfileImage,
    username,
    location,
    postImage,
    createdAt,
    post,
}) => {
    // Initialize necessary states and variables
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const token = localStorage.getItem("token");
    const { user, comments } = useSelector((store) => store);
    const [isSaved, setIsSaved] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [numberOfLikes, setNumberOfLike] = useState(0);
    const [numberOfComment, setNumberOfComment] = useState(0);
    const [commentContent, setCommentContent] = useState("");
    const [lastComment, setLastComment] = useState(null);

    // Data object containing JWT token and postId
    const data = {
        jwt: token,
        postId: post.id,
    };

    // Event handler for comment input change
    const handleCommnetInputChange = (e) => {
        setCommentContent(e.target.value);
    };

    // Event handler for pressing Enter key to add a comment
    const handleOnEnterPress = (e) => {
        if (e.key === "Enter") {
            handleAddComment();
        }
    };

    // Event handler for liking a post
    const handleLikePost = () => {
        dispatch(likePostAction(data));
        setIsPostLiked(true);
        setNumberOfLike(numberOfLikes + 1);
    };

    // Event handler for unliking a post
    const handleUnLikePost = () => {
        dispatch(unLikePostAction(data));
        setIsPostLiked(false);
        setNumberOfLike(numberOfLikes - 1);
    };

    // Event handler for adding a comment
    const handleAddComment = () => {
        const commentData = {
            jwt: token,
            postId: post.id,
            data: {
                content: commentContent,
            },
        };
        dispatch(createComment(commentData, handleCreatedComment));
        setCommentContent("");
        setNumberOfComment(numberOfComment + 1);
    };

    // Callback function to handle the created comment
    const handleCreatedComment = (comment) => {
        // Update lastComment with the newly created comment
        setLastComment(comment);
    };

    console.log("userDto : ", post.comments[post.comments.length - 1]);

    // Event handler for saving a post
    const handleSavePost = () => {
        dispatch(savePostAction(data));
        setIsSaved(true);
        toast({
            title: "Saved Post",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    // Event handler for unsaving a post
    const handleUnSavePost = () => {
        dispatch(unSavePostAction(data));
        setIsSaved(false);
        toast({
            title: "Unsaved Post",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    // Event handler for navigating to a user's profile
    const handleNavigate = (username) => {
        navigate(`/${username}`);
    };

    // Handle initialization and updates using useEffect
    useEffect(() => {
        // Check if the post is saved by the user
        setIsSaved(isSavedPost(user.reqUser, post.id));
        // Check if the post is liked by the user
        setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
        // Set the number of likes on the post
        setNumberOfLike(post?.likedByUsers?.length);
        // Set the number of comments on the post
        setNumberOfComment(post?.comments?.length);
        // Set the last comment if available
        if (post.comments.length > 0) {
            setLastComment(post.comments[post.comments.length - 1]);
        }
    }, [user.reqUser, post, post.comments, "Enter"]);

    // Event handler for toggling dropdown menu
    function handleClick() {
        setShowDropdown(!showDropdown);
    }

    // Event handler for closing dropdown menu on window click
    function handleWindowClick(event) {
        if (!event.target.matches(".dots")) {
            setShowDropdown(false);
        }
    }

    // Add event listener to handle window click
    useEffect(() => {
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, []);

    // Event handler for deleting a post
    const handleDeletePost = (postId) => {
        const postData = {
            jwt: token,
            postId,
        };
        dispatch(deletePostAction(postData));
        toast({
            title: "Deleted Post",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    // Check if the post is owned by the logged-in user
    const isOwnPost = isReqUserPost(post, user.reqUser);

    // Event handler for opening the comment modal
    const handleOpenCommentModal = () => {
        navigate(`/p/${post.id}`);
        onOpen();
    };

    // Render the PostCard component
    return (
        <div>
            <div className="flex flex-col items-center w-full border rounded-md">
                <div className="flex justify-between items-center w-full py-4 px-5">
                    <div className="flex items-center">
                        <img
                            className="w-12 h-12 rounded-full"
                            src={userProfileImage}
                            alt=""
                        />

                        <div className="pl-2">
                            <p className="font-semibold text-sm flex items-center">
                                <span
                                    onClick={() => handleNavigate(username)}
                                    className="cursor-pointer"
                                >
                                    {username}
                                </span>
                                <span className="opacity-50 flex items-center">
                                    {" "}
                                    <BsDot />
                                    {createdAt}
                                </span>{" "}
                            </p>
                            <p className="font-thin text-sm">{location} </p>
                        </div>
                    </div>
                    <div>
                        {isOwnPost && (
                            <div className="dropdown">
                                <BsThreeDots
                                    onClick={handleClick}
                                    className="dots"
                                />

                                <div className="dropdown-content">
                                    {showDropdown && (
                                        <p
                                            onClick={() =>
                                                handleDeletePost(post.id)
                                            }
                                            className="bg-black text-white py-1 px-4 rounded-md cursor-pointer"
                                        >
                                            Delete
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className=" w-full">
                    <img className="w-full" src={postImage} alt="" />
                </div>
                <div className="flex justify-between items-center w-full px-5 py-4">
                    <div className="flex items-center space-x-2 ">
                        {isPostLiked ? (
                            <AiFillHeart
                                onClick={handleUnLikePost}
                                className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
                            />
                        ) : (
                            <AiOutlineHeart
                                onClick={handleLikePost}
                                className="text-2xl hover:opacity-50 cursor-pointer "
                            />
                        )}

                        <FaRegComment
                            onClick={handleOpenCommentModal}
                            className="text-xl hover:opacity-50 cursor-pointer"
                        />
                        <IoPaperPlaneOutline className="text-2xl hover:opacity-70 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                        {isSaved ? (
                            <BsBookmarkFill
                                onClick={() => handleUnSavePost(post.id)}
                                className="text-xl"
                            />
                        ) : (
                            <BsBookmark
                                onClick={() => handleSavePost(post.id)}
                                className="text-xl hover:opacity-50 cursor-pointer"
                            />
                        )}
                    </div>
                </div>
                <div className="w-full py-2 px-5">
                    {numberOfLikes > 0 && (
                        <p className="text-sm">{numberOfLikes} likes </p>
                    )}
                    {lastComment && numberOfComment > 0 && (
                        <div className="flex justify-center mt-3">
                            <div className="mr-3">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={
                                        lastComment.userDto.userImage ||
                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                    }
                                    alt=""
                                />
                            </div>

                            <div className="w-[90%] mt-2">
                                <span className="font-semibold text-sm">
                                    {" "}
                                    {lastComment.userDto.username}{" "}
                                </span>
                                <span className="commentBox">
                                    {lastComment.content}
                                </span>
                            </div>
                        </div>
                    )}
                    {numberOfComment > 0 && (
                        <p
                            onClick={handleOpenCommentModal}
                            className="opacity-50 text-sm py-2 -z-0 cursor-pointer"
                        >
                            View all {numberOfComment} comments
                        </p>
                    )}
                </div>

                <div className="border border-t w-full">
                    <div className="w-full flex items-center px-5">
                        <BsEmojiSmile className="" />
                        <input
                            onKeyPress={handleOnEnterPress}
                            onChange={handleCommnetInputChange}
                            className="commentInput"
                            type="text"
                            placeholder="Add a comment..."
                            value={commentContent}
                        />
                    </div>
                </div>
            </div>

            <CommentModal
                handleLikePost={handleLikePost}
                handleSavePost={handleSavePost}
                handleUnSavePost={handleUnSavePost}
                handleUnLikePost={handleUnLikePost}
                isPostLiked={isPostLiked}
                isSaved={isSaved}
                postData={post}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
            />
        </div>
    );
};

export default PostCard;
