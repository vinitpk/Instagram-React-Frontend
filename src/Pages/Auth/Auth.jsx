import React from "react";
import { useLocation } from "react-router-dom";
import Signin from "../../Components/Register/Signin";
import Signup from "../../Components/Register/Singup";
import homephone from "../Auth/images/home-phone.png";
import "./Auth.css";

// Component for rendering authentication page
const Auth = () => {
    // Get the current location using useLocation hook from react-router-dom
    const location = useLocation();

    return (
        <div>
            {/* Container for the authentication page */}
            <div className="flex items-center justify-center h-[100vh] space-x-5">
                {/* Container for the image of a mobile phone (visible only on large screens) */}
                <div className="relative hidden lg:block">
                    <div className="home-phone">
                        {/* Display the image of a mobile phone */}
                        <img className="" src={homephone} alt="homephone" />
                        {/* Semi-transparent overlay for mobile wallpaper effect */}
                        <div className="mobileWallpaper absolute"></div>
                    </div>
                </div>
                {/* Container for authentication form (Signin or Signup based on current location) */}
                <div className="w-[40vw] lg:w-[25vw]">
                    {/* Render Signin component if current location is /login, otherwise render Signup */}
                    {location.pathname === "/login" ? <Signin /> : <Signup />}
                </div>
            </div>
        </div>
    );
};

export default Auth;
