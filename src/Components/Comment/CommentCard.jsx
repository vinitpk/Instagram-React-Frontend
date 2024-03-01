// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logic";
import { likeComment } from "../../Redux/Comment/Action";

const CommentCard = ({ comment }) => {
    // State to track whether the comment is liked by the current user
    const [isCommentLiked, setIsCommentLike] = useState(false);

    // Redux store access
    const { user } = useSelector((store) => store);
    const dispatch = useDispatch();

    // State to keep track of the number of likes for the comment
    const [commentLikes, setCommentLikes] = useState(0);

    // Get JWT token from localStorage
    const jwt = localStorage.getItem("token");

    // Function to handle liking a comment
    const handleLikeComment = () => {
        // Dispatch action to like the comment
        dispatch(likeComment({ jwt, commentId: comment.id }));
        setIsCommentLike(true);
        setCommentLikes(commentLikes + 1);
    };

    // Function to handle unliking a comment
    const handleUnLikeComment = () => {
        // Dispatch action to unlike the comment
        dispatch(likeComment({ jwt, commentId: comment.id }));
        setIsCommentLike(false);
        setCommentLikes(commentLikes - 1);
    };

    // Effect to update commentLikes when the comment prop changes
    useEffect(() => {
        setCommentLikes(comment?.likedByUsers?.length || 0);
    }, [comment]);

    // Effect to update isCommentLiked when the user changes
    useEffect(() => {
        setIsCommentLike(isCommentLikedByUser(comment, user.reqUser?.id));
    }, [comment, user.reqUser]);

    return (
        <div>
            <div className="reqUser flex justify-between items-center py-5">
                <div className="flex items-center">
                    <div className="">
                        <img
                            className="w-9 h-9 rounded-full"
                            src={
                                comment.userDto.userImage ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            alt=""
                        />
                    </div>
                    <div className="ml-3">
                        <p>
                            <span className="font-semibold">
                                {comment.userDto.username}
                            </span>
                            <span className="ml-2">{comment.content}</span>
                        </p>
                        <div className="flex items-center space-x-3 text-xs opacity-60 pt-2">
                            <span>{timeDifference(comment?.createdAt)}</span>
                            {commentLikes > 0 && (
                                <span>
                                    {commentLikes} like
                                    {commentLikes !== 1 && "s"}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {isCommentLiked ? (
                    <AiFillHeart
                        onClick={handleUnLikeComment}
                        className="text-xs hover:opacity-50 cursor-pointer text-red-600"
                    />
                ) : (
                    <AiOutlineHeart
                        onClick={handleLikeComment}
                        className="text-xs hover:opacity-50 cursor-pointer "
                    />
                )}
            </div>
        </div>
    );
};

export default CommentCard;
