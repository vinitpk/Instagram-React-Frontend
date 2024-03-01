import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Auth from "../Auth/Auth";
import EditProfilePage from "../EditProfile/EditProfilePage";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";

const Routers = () => {
    // Get the current location using useLocation hook
    const location = useLocation();

    return (
        <div>
            {/* Render sidebar if not on login or signup page */}
            {location.pathname !== "/login" &&
                location.pathname !== "/signup" && (
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
