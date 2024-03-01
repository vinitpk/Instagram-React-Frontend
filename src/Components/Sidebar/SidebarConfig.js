// Define the icons to be used for each menu item
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

// Define the menu items with their titles and icons
export const menu = [
    {
        title: "Home",
        icon: <AiOutlineHome className="text-2xl mr-5" />, // Icon for Home menu item when not active
        activeIcon: <AiFillHome className="text-2xl mr-5" />, // Icon for Home menu item when active
    },
    {
        title: "Search",
        icon: <AiOutlineSearch className="text-2xl mr-5" />, // Icon for Search menu item when not active
        activeIcon: <AiOutlineSearch className="text-2xl mr-5" />, // Icon for Search menu item when active
    },
    {
        title: "Explore",
        icon: <AiOutlineCompass className="text-2xl mr-5" />, // Icon for Explore menu item when not active
        activeIcon: <AiFillCompass className="text-2xl mr-5" />, // Icon for Explore menu item when active
    },
    {
        title: "Reels",
        icon: <RiVideoLine className="text-2xl mr-5" />, // Icon for Reels menu item when not active
        activeIcon: <RiVideoFill className="text-2xl mr-5" />, // Icon for Reels menu item when active
    },
    {
        title: "Message",
        icon: <AiOutlineMessage className="text-2xl mr-5" />, // Icon for Message menu item when not active
        activeIcon: <AiFillMessage className="text-2xl mr-5" />, // Icon for Message menu item when active
    },
    {
        title: "Notifications",
        icon: <AiOutlineHeart className="text-2xl mr-5" />, // Icon for Notifications menu item when not active
        activeIcon: <AiFillHeart className="text-2xl mr-5" />, // Icon for Notifications menu item when active
    },
    {
        title: "Create",
        icon: <AiOutlinePlusCircle className="text-2xl mr-5" />, // Icon for Create menu item when not active
        activeIcon: <AiFillPlusCircle className="text-2xl mr-5" />, // Icon for Create menu item when active
    },
    {
        title: "Profile",
        icon: <CgProfile className="text-2xl mr-5" />, // Icon for Profile menu item when not active
        activeIcon: <CgProfile className="text-2xl mr-5" />, // Icon for Profile menu item when active
    },
];
