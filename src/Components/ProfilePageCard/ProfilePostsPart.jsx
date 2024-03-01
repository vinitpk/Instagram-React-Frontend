// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { RiVideoLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";

const ProfilePostsPart = ({ user }) => {
    // Define state variables
    const [activeTab, setActiveTab] = useState("Post");

    // Access Redux store using useSelector
    const { post } = useSelector((store) => store);
    const reqUser = useSelector((store) => store.user.reqUser);
    const token = localStorage.getItem("token");

    // Initialize Redux dispatch
    const dispatch = useDispatch();

    // Define tabs with related information
    const tabs = [
        {
            tab: "Post",
            icon: <AiOutlineTable className="text-xl" />,
            activeTab: "",
        },
        {
            tab: "Reels",
            icon: <RiVideoLine className="text-xl" />,
            activeTab: "",
            hidden: reqUser?.id !== user?.id,
        },
        {
            tab: "Saved",
            icon: <BiBookmark className="text-xl" />,
            activeTab: "",
            hidden: reqUser?.id !== user?.id,
        },
        {
            tab: "Tagged",
            icon: <AiOutlineUser className="text-xl" />,
            activeTab: "",
            hidden: reqUser?.id !== user?.id,
        },
    ];

    // Fetch user posts based on active tab and dependencies
    useEffect(() => {
        const data = {
            jwt: token,
            userId: user?.id,
        };
        dispatch(reqUserPostAction(data));
    }, [
        user,
        post.createdPost,
        post.deletedPost,
        post.savePost,
        post.unsavePost,
    ]);

    return (
        <div className="">
            <div className="flex space-x-14 border-t relative ">
                {tabs.map(
                    (item) =>
                        !item.hidden && ( // Added condition to check the 'hidden' property
                            <div
                                onClick={() => setActiveTab(item.tab)}
                                className={`${
                                    item.tab === activeTab
                                        ? "border-t border-black"
                                        : "opacity-60"
                                } flex items-center cursor-pointer py-2 text-sm`}
                            >
                                <p>{item.icon}</p>

                                <p className="ml-1">{item.tab} </p>
                            </div>
                        )
                )}
            </div>
            <div>
                <div className="flex flex-wrap">
                    {post.reqUserPost?.length > 0 && activeTab === "Post"
                        ? post.reqUserPost?.map((item, index) => (
                              <ReqUserPostCard
                                  tab={activeTab}
                                  post={item}
                                  key={index}
                              />
                          ))
                        : activeTab === "Saved"
                        ? user?.savedPost?.map((item, index) => (
                              <ReqUserPostCard
                                  tab={activeTab}
                                  post={item}
                                  key={index}
                              />
                          ))
                        : ""}
                </div>
            </div>
        </div>
    );
};

export default ProfilePostsPart;
