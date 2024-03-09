import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Auth from "../Auth/Auth";
import EditProfilePage from "../EditProfile/EditProfilePage";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import { useSelector } from "react-redux";

const Routers = () => {
    // Get the current location using useLocation hook
    const location = useLocation();
    const reqUser = useSelector((store) => store.user.reqUser);
    const [isReqUser, setIsReqUser] = useState();
    const navigate = useNavigate();

    // Check if user
    useEffect(() => {
        if (reqUser) {
            setIsReqUser(true);
        } else {
            setIsReqUser(false);
            if (
                location.pathname !== "/login" &&
                location.pathname !== "/signup"
            ) {
                navigate("/login");
            }
        }
    });
    return (
        <div>
            {/* Render sidebar if not on login or signup page */}
            {location.pathname !== "/login" &&
                location.pathname !== "/signup" &&
                isReqUser && (
                    <div className="flex">
                        {/* Render sidebar component */}
                        <div className="sidebarBox border border-l-slate-500 w-[20%]">
                            <Sidebar />
                        </div>
                        {/* Render main content */}
                        <div className="w-[80%]">
                            <Routes>
                                {/* Define routes for various pages */}
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/p/:postId"
                                    element={<HomePage />}
                                />
                                <Route
                                    path="/:username"
                                    element={<Profile />}
                                />
                                <Route
                                    path="/story/:userId"
                                    element={<Story />}
                                />
                                <Route
                                    path="/account/edit"
                                    element={<EditProfilePage />}
                                />
                            </Routes>
                        </div>
                    </div>
                )}

            {/* Render authentication pages only if on login or signup page */}
            {(location.pathname === "/login" ||
                location.pathname === "/signup") && (
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route path="/signup" element={<Auth />} />
                </Routes>
            )}
        </div>
    );
};

export default Routers;
