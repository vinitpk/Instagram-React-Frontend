import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findStoryByUserId } from "../../../Redux/Story/Action";
import { useSelector } from "react-redux";

const StoryCircle = ({ image, username, userId }) => {
  const navigate = useNavigate();
  const reqUser = useSelector((store) => store.user.reqUser);
  const handleNavigate = () => {
    navigate(`story/${userId}`);
  };

  console.log(reqUser);
  
  return (
    <div className="cursor-pointer flex flex-col items-center" onClick={handleNavigate}>
      <img className="w-16 h-16 rounded-full" src={image} alt="" />
      <p className="mt-1">
      {reqUser.id === userId ? "Your story" : (username?.length > 9 ? username.substring(0, 9) + "..." : username)}
      </p>
    </div>
  );
};

export default StoryCircle;
