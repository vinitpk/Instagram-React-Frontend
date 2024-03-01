import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoryProgressBar from "./StoryProgress";
import { useNavigate } from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStoryAction } from "../../../Redux/Story/Action";

const StoryViewerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #333;
    margin-top: 35px;
`;

const StoryImage = styled.div`
    max-height: 80vh;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
        width: 75%;
        height: 75%;
        object-fit: cover;
    }

    p {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 18px;
        background-color: rgba(0, 0, 0, 1);
        padding: 5px 10px;
        border-radius: 5px;
    }
`;

function StoryViewer({ stories }) {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [currentUserStoryIndex, setCurrentUserStoryIndex] = useState(0);
    const { reqUser } = useSelector((store) => store.user);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNextStory = () => {
        if (currentStoryIndex < stories?.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            setActiveIndex(activeIndex + 1);
        } else if (currentStoryIndex === stories?.length - 1) {
            setCurrentStoryIndex(0);
            setActiveIndex(0);
            navigate("/");
        }
    };

    const handlePrevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
            setActiveIndex(activeIndex - 1);
        } else if (currentStoryIndex === 0) {
            setCurrentStoryIndex(stories.length - 1);
            setActiveIndex(stories.length - 1);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "ArrowRight") {
            handleNextStory();
        } else if (event.key === "ArrowLeft") {
            handlePrevStory();
        } else if (event.key === "Enter") {
            navigate("/");
        } else if (event.key === "Escape") {
            navigate("/");
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNextStory();
        }, 5000);
        return () => clearInterval(intervalId);
    }, [currentStoryIndex]);

    useEffect(() => {
        const container = document.getElementById("story-container");
        container.focus();
    });

    // Event handler for deleting a story
    const handleDeleteStory = (storyId) => {
        const storyData = {
            jwt: token,
            storyId,
        };
        dispatch(deleteStoryAction(storyData));
        toast({
            title: "Deleted Story",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        // Reload the page after delete action
        navigate("/");
    };

    return (
        <div className="relative w-full">
            <StoryViewerContainer
                id="story-container"
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                {
                    <StoryImage>
                        <img
                            src={stories?.[currentStoryIndex].image}
                            alt="story image"
                        />
                        {stories?.[currentStoryIndex].caption.length > 0 && (
                            <p>{stories?.[currentStoryIndex].caption}</p>
                        )}
                    </StoryImage>
                }
            </StoryViewerContainer>
            {reqUser?.id === stories?.[currentStoryIndex].userDto.id && (
                <div
                    onClick={() =>
                        handleDeleteStory(stories?.[currentStoryIndex].id)
                    }
                    className="absolute bottom-4 left-4 flex w-full"
                >
                    <Button colorScheme="red" variant="outline" size="sm">
                        Delete
                    </Button>
                </div>
            )}
            <div className="absolute top-0 flex w-full">
                {stories.map((story, index) => (
                    <StoryProgressBar
                        key={index}
                        duration={5000}
                        index={index}
                        activeIndex={activeIndex}
                    />
                ))}
            </div>
        </div>
    );
}
export default StoryViewer;
