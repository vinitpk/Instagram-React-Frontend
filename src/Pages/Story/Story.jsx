import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StoryViewer from "../../Components/Story/StoryViewer/StoryViewer";
import { findStoryByUserId } from "../../Redux/Story/Action";

const Story = () => {
    // Retrieve necessary data from Redux store
    const { story } = useSelector((store) => store);

    const dispatch = useDispatch();

    // Get userId parameter from URL
    const { userId } = useParams();

    // Fetch stories data based on userId when component mounts
    useEffect(() => {
        // Prepare data for fetching stories
        const data = { jwt: localStorage.getItem("token"), userId };

        // Dispatch action to fetch stories
        dispatch(findStoryByUserId(data));
    }, [userId, dispatch]); // Dependency array ensures effect runs only when userId changes

    return (
        <div>
            {/* Render StoryViewer component if there are stories available */}
            {story.stories?.length > 0 && (
                <StoryViewer stories={story.stories} />
            )}
        </div>
    );
};

export default Story;
