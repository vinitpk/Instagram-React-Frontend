import React, { useEffect, useRef, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useDisclosure } from "@chakra-ui/hooks";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import SearchComponent from "../SearchComponent/SearchComponent";
import CreatePostModal from "../Post/Create/CreatePostModal";
import {
    AiOutlineHome,
    AiFillHome,
    AiOutlineSearch,
    AiOutlineCompass,
    AiFillCompass,
    AiFillMessage,
    AiOutlineMessage,
    AiOutlineHeart,
    AiFillHeart,
    AiOutlinePlusCircle,
    AiFillPlusCircle,
} from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import CreateStoryModal from "../Story/Create/CreateStoryModal";

const Sidebar = (tab) => {
    const navigate = useNavigate();

    // State and refs initialization
    const [activeTab, setActiveTab] = useState("Profile");
    const excludedBoxRef = useRef(null);
    const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
    const {
        isOpen: isOpenPost,
        onOpen: onOpenPost,
        onClose: onClosePost,
    } = useDisclosure();
    const {
        isOpen: isOpenStory,
        onOpen: onOpenStory,
        onClose: onCloseStory,
    } = useDisclosure();
    const { user } = useSelector((store) => store);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownCreate, setShowDropdownCreate] = useState(false);
    const [dropdownHovered, setDropdownHovered] = useState(false);

    // Function to handle tab clicks
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // Navigate to corresponding route on tab click
        if (tab === "Profile") {
            navigate(`/${user.reqUser?.username}`);
        } else if (tab === "Home") {
            navigate("/");
        } else if (tab === "Create Post") {
            onOpenPost();
        } else if (tab === "Create Story") {
            onOpenStory();
        } else if (tab === "Create") {
            setShowDropdownCreate(!showDropdownCreate);
        }

        // Toggle search box visibility based on tab
        if (tab === "Search") {
            setIsSearchBoxVisible(true);
        } else setIsSearchBoxVisible(false);
    };

    // Functions to handle dropdown visibility
    function handleDropdownHover() {
        setShowDropdown(true);
    }

    function handleDropdownLeave() {
        setShowDropdown(false);
    }

    function handleDropdownMouseEnter() {
        setDropdownHovered(true);
    }

    function handleDropdownMouseLeave() {
        setDropdownHovered(false);
    }

    // Function to handle saved posts
    const handleSavedPost = () => {
        navigate(`/${user.reqUser?.username}`);
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Render sidebar component
    return (
        <div className="sticky top-0 h-[100vh] flex">
            <div
                className={`${
                    activeTab === "Search" ? "px-2" : "px-10"
                } flex flex-col justify-between h-full`}
            >
                <div className="pt-10">
                    {!isSearchBoxVisible && (
                        <img
                            className="w-40"
                            src="https://i.imgur.com/zqpwkLQ.png"
                            alt=""
                        />
                    )}
                    <div
                        className={` ${
                            activeTab === "Search" ? "mt-20 pt-2" : "mt-10"
                        }`}
                    >
                        {/* Menu items */}
                        <div
                            onClick={() => handleTabClick("Home")}
                            className="flex items-center mb-5 cursor-pointer text-lg"
                        >
                            {activeTab === "Home" ? (
                                <AiFillHome className="text-2xl mr-5" />
                            ) : (
                                <AiOutlineHome className="text-2xl mr-5" />
                            )}
                            <p
                                className={`${
                                    activeTab === "Home"
                                        ? "font-bold"
                                        : "font-semibold"
                                } ${isSearchBoxVisible ? "hidden" : "block"}`}
                            >
                                Home
                            </p>
                        </div>

                        <div
                            onClick={() => handleTabClick("Search")}
                            className="flex items-center mb-5 cursor-pointer text-lg"
                        >
                            <AiOutlineSearch className="text-2xl mr-5" />
                            <p
                                className={`${
                                    activeTab === "Search"
                                        ? "font-bold"
                                        : "font-semibold"
                                } ${isSearchBoxVisible ? "hidden" : "block"}`}
                            >
                                Search
                            </p>
                        </div>

                        <div
                            onClick={() => handleTabClick("Explore")}
                            className="flex items-center mb-5 cursor-pointer text-lg"
                        >
                            {activeTab === "Explore" ? (
                                <AiFillCompass className="text-2xl mr-5" />
                            ) : (
                                <AiOutlineCompass className="text-2xl mr-5" />
                            )}
                            <p
                                className={`${
                                    activeTab === "Explore"
                                        ? "font-bold"
                                        : "font-semibold"
                                } ${isSearchBoxVisible ? "hidden" : "block"}`}
                            >
                                Explore
                            </p>
                        </div>
                        <div
                            onClick={() => handleTabClick("Reels")}
                            className="flex items-center mb-5 cursor-pointer text-lg"
                        >
                            {activeTab === "Reels" ? (
                                <RiVideoFill className="text-2xl mr-5" />
                            ) : (
                                <RiVideoLine className="text-2xl mr-5" />
                            )}
                            <p
                                className={`${
                                    activeTab === "Reels"
                                        ? "font-bold"
                                        : "font-semibold"
                                } ${isSearchBoxVisible ? "hidden" : "block"}`}
                            >
                                Reels
                            </p>
                        </div>
                        <div
                            onClick={() => handleTabClick("Message")}
                            className="flex items-center mb-5 cursor-pointer text-lg"
                        >
                            {activeTab === "Message" ? (
                                <AiFillMessage className="text-2xl mr-5" />
                            ) : (
                                <AiOutlineMessage className="text-2xl mr-5" />
                            )}
                            <p
                                className={`${
                                    activeTab === "Message"
                                        ? "font-bold"
                                        : "font-semibold"
                                } ${isSearchBoxVisible ? "hidden" : "block"}`}
                            >
                                Message
                            </p>
                        </div>
                        <div
                            onClick={() => handleTabClick("Notifications")}
                            className="flex items-center mb-5 cursor-pointer text-lg"
                        >
                            {activeTab === "Notifications" ? (
                                <AiFillHeart className="text-2xl mr-5" />
                            ) : (
                                <AiOutlineHeart className="text-2xl mr-5" />
                            )}
                            <p
                                className={`${
                                    activeTab === "Notifications"
                                        ? "font-bold"
                                        : "font-semibold"
                                } ${isSearchBoxVisible ? "hidden" : "block"}`}
                            >
                                Notifications
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                handleTabClick("Create");
                            }}
                            className="flex items-center mb-5 cursor-pointer text-lg relative"
                        >
                            {activeTab === "Create" ? (
                                <AiFillPlusCircle className="text-2xl mr-5" />
                            ) : (
                                <AiOutlinePlusCircle className="text-2xl mr-5" />
                            )}
                            <p
                                className={`${
                                    activeTab === "Create"
                                        ? "font-bold"
                                        : "font-semibold"
                                } ${isSearchBoxVisible ? "hidden" : "block"}`}
                            >
                                Create
                            </p>
                            {activeTab === "Create" && (
                                <div
                                    className=" absolute left-6rem bg-white shadow-md rounded-md z-10"
                                    style={{ left: "6rem" }}
                                >
                                    <p
                                        onClick={onOpenStory}
                                        className="py-2 px-4 text-base cursor-pointer hover:bg-gray-100"
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        Create Story
                                    </p>
                                    <p
                                        onClick={onOpenPost}
                                        className="py-2 px-4 text-base cursor-pointer border-t hover:bg-gray-100"
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        Create Post
                                    </p>
                                </div>
                            )}
                        </div>
                        <div
                            onClick={() => handleTabClick("Profile")}
                            className="flex items-center mb-5 cursor-pointer text-lg"
                        >
                            {activeTab === "Profile" ? (
                                <CgProfile className="text-2xl mr-5" />
                            ) : (
                                <CgProfile className="text-2xl mr-5" />
                            )}
                            <p
                                className={`${
                                    activeTab === "Profile"
                                        ? "font-bold"
                                        : "font-semibold"
                                } ${isSearchBoxVisible ? "hidden" : "block"}`}
                            >
                                Profile
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative mb-10">
                    <div
                        onMouseEnter={handleDropdownHover}
                        onMouseLeave={handleDropdownLeave}
                        className="flex items-center cursor-pointer  "
                    >
                        <IoReorderThreeOutline className="text-2xl" />
                        {!isSearchBoxVisible && (
                            <p
                                className="ml-5 "
                                style={{
                                    fontWeight:
                                        showDropdown || dropdownHovered
                                            ? "bold"
                                            : "normal",
                                }}
                            >
                                More
                            </p>
                        )}
                    </div>
                    <div
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                        className={`absolute bottom-6 ${
                            activeTab !== "Search" ? "w-[80%]" : ""
                        }`}
                    >
                        {(showDropdown || dropdownHovered) && (
                            <div className="shadow-md">
                                <p
                                    onClick={handleSavedPost}
                                    className="py-2 px-4 text-base cursor-pointer hover:bg-gray-100"
                                    style={{ whiteSpace: "nowrap" }}
                                >
                                    Saved
                                </p>
                                <p
                                    onClick={handleLogout}
                                    className="py-2 px-4 text-base cursor-pointer border-t hover:bg-gray-100"
                                    style={{ whiteSpace: "nowrap" }}
                                >
                                    Log out
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isSearchBoxVisible && (
                <div>
                    <SearchComponent
                        setIsSearchVisible={setIsSearchBoxVisible}
                    />
                </div>
            )}
            <CreateStoryModal
                onClose={onCloseStory}
                isOpen={isOpenStory}
                onOpen={onOpenStory}
            />
            <CreatePostModal
                onClose={onClosePost}
                isOpen={isOpenPost}
                onOpen={onOpenPost}
            />
        </div>
    );
};

export default Sidebar;
