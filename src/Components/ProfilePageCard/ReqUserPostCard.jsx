import React, { useEffect } from "react";
import "./ReqUserPostCard.css";
import { AiFillHeart } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { deletePostAction, unSavePostAction } from "../../Redux/Post/Action";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

const ReqUserPostCard = ({ tab, post }) => {

    // Access token from localStorage
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const toast = useToast();
    const reqUser = useSelector((store) => store.user.reqUser);

    // Function to handle post deletion
    const handleDeletePost = (postId) => {
        const data = {
            jwt: token,
            postId,
        };
        dispatch(deletePostAction(data));
        toast({
            title: "Deleted Post",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    // Function to handle unsave post action
    const handleUnsavePost = (postId) => {
        const data = {
            jwt: token,
            postId,
        };
        dispatch(unSavePostAction(data));
        toast({
            title: "Unsaved Post",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };


    return (
        <div className="p-2">
            <div className="post w-60 h-60">
                <img className="cursor-pointer" src={post?.image} alt="" />
                <div className="overlay">
                    <div className="overlay-text flex justify-between">
                        <div className="flex items-center mr-5">
                            <AiFillHeart className="mr-1" />{" "}
                            <span>{post?.likedByUsers?.length}</span>
                        </div>
                        <div className="flex items-center mr-5">
                            <FaComment className="mr-1" />{" "}
                            <span>{post?.comments?.length}</span>
                        </div>
                        {post.user.username === reqUser.username &&
                            tab === "Post" && (
                                <div className="flex items-center flex-col justify-center mr-5">
                                    <MdDelete
                                        onClick={() =>
                                            handleDeletePost(post.id)
                                        }
                                        className="mr-1 text-2xl hover:opacity-70 cursor-pointer text-red-600"
                                    />
                                    <p
                                        className="bg-white text-red-600 py-1 px-4 rounded-md cursor-pointer"
                                        onClick={() =>
                                            handleDeletePost(post.id)
                                        }
                                    >
                                        Delete
                                    </p>
                                </div>
                            )}
                        {tab !== "Post" && (
                            <div className="flex items-center flex-col justify-center mr-5">
                                <MdDelete
                                    onClick={() => handleUnsavePost(post.id)}
                                    className="mr-1 text-2xl hover:opacity-70 cursor-pointer text-red-600"
                                />
                                <p
                                    className="bg-white text-red-600 py-1 px-4 rounded-md cursor-pointer"
                                    onClick={() => handleUnsavePost(post.id)}
                                >
                                    Remove
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReqUserPostCard;
