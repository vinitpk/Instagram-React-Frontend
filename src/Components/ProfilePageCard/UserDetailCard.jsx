import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUserAction, unFollowUserAction } from "../../Redux/User/Action";

const UserDetailCard = ({ user, isRequser, isFollowing }) => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    
    // Accessing Redux store using useSelector
    const { post } = useSelector((store) => store);
    
    // Navigation hook for redirecting to different routes
    const navigate = useNavigate();
    
    // Dispatch function to dispatch actions to Redux store
    const dispatch = useDispatch();
    
    // State variables
    const [isFollow, setIsFollow] = useState(isFollowing);
    const [numberOffollower, setNumberOffollower] = useState(0);
    const [numberOffollowing, setNumberOffollowing] = useState(0);
    
    // Function to navigate to account edit page
    const goToAccountEdit = () => {
        navigate("/account/edit");
    };

    // Data object containing JWT token and userID
    const data = {
        jwt: token,
        userId: user?.id,
    };

    // Function to handle follow user action
    const handleFollowUser = () => {
        dispatch(followUserAction(data));
        setIsFollow(true);
        setNumberOffollower(numberOffollower + 1);
    };

    // Function to handle unfollow user action
    const handleUnFollowUser = () => {
        dispatch(unFollowUserAction(data));
        setIsFollow(false);
        setNumberOffollower(numberOffollower - 1);
    };

    // Update state variables when isFollowing or user changes
    useEffect(() => {
        setIsFollow(isFollowing);
        setNumberOffollower(user?.follower?.length || 0);
        setNumberOffollowing(user?.following?.length || 0);
    }, [isFollowing, user]);

    // Render the UserDetailCard component
    return (
        <div className="py-10">
            <div className="flex items-center">
                <div className="w-[15%]">
                    <img
                        className="w-32 h-32 rounded-full"
                        src={
                            user?.image ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt=""
                    />
                </div>

                <div className="ml-10 space-y-5 text-xs">
                    <div className=" flex space-x-10 items-center">
                        <p className="text-base">{user?.username}</p>
                        <button className="text-xs py-1 px-5 bg-slate-100 hover:bg-slate-300 rounded-md font-semibold">
                            {isRequser ? (
                                <span onClick={goToAccountEdit}>
                                    Edit profile
                                </span>
                            ) : isFollow ? (
                                <span onClick={handleUnFollowUser}>
                                    Unfollow{" "}
                                </span>
                            ) : (
                                <span onClick={handleFollowUser}>Follow</span>
                            )}
                        </button>
                        <button className="text-xs py-1 px-5 bg-slate-100 hover:bg-slate-300 rounded-md font-semibold">
                            {isRequser ? "Add tools" : "Message"}
                        </button>
                        <TbCircleDashed className="text-xl" />
                    </div>

                    <div className="flex space-x-10">
                        <div>
                            <span className="font-semibold mr-2">
                                {post?.reqUserPost?.length || 0}
                            </span>
                            <span>posts</span>
                        </div>

                        <div>
                            <span className="font-semibold mr-2">
                                {numberOffollower}
                            </span>
                            <span>followers</span>
                        </div>
                        <div>
                            <span className="font-semibold mr-2">
                                {numberOffollowing}
                            </span>
                            <span>following</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">{user?.name}</p>
                        <p className="font-thin text-sm">{user?.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailCard;
