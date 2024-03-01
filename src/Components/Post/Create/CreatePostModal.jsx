// Import necessary components and libraries
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal"; // Import components from Chakra UI
import { FaPhotoVideo } from "react-icons/fa"; // Import icons
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { createPost } from "../../../Redux/Post/Action"; // Import action to create a post
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary"; // Function to upload images to Cloudinary

// CreatePostModal functional component
const CreatePostModal = ({ onOpen, isOpen, onClose }) => {
    const finalRef = React.useRef(null); // Create a reference for the final focus
    const [file, setFile] = useState(null); // State to hold the selected file
    const [isDragOver, setIsDragOver] = useState(false); // State to track drag over event

    const dispatch = useDispatch(); // Get dispatch function from Redux
    const token = localStorage.getItem("token"); // Get token from localStorage
    const { user } = useSelector((store) => store); // Get user data from Redux store

    // State to hold post data (image, caption, location)
    const [postData, setPostData] = useState({
        image: "",
        caption: "",
        location: "",
    });

    // Handle input change on input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Handle file drop event
    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile.type.startsWith("image/")) {
            setFile(droppedFile);
        }
    }

    // Handle drag over event
    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setIsDragOver(true);
    }

    // Handle drag leave event
    function handleDragLeave(event) {
        setIsDragOver(false);
    }

    // Handle file selection event
    const handleOnChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFile(file);
            const url = await uploadToCloudinary(file);
            setPostData((prevValues) => ({ ...prevValues, image: url }));
        } else {
            setFile(null);
            alert("Please select an image file.");
        }
    };

    // Handle submit event to create a new post
    const handleSubmit = async () => {
        const data = {
            jwt: token,
            data: postData,
        };
        if (token) {
            dispatch(createPost(data)); // Dispatch createPost action with data
            onClose(); // Close the modal
        }
    };

    // Render the component
    return (
        <div>
            <Modal
                size={"4xl"}
                className=""
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setFile(null);
                    setIsDragOver(false);
                }}
            >
                <ModalOverlay />
                <ModalContent fontSize={"sm"}>
                    <div className="flex justify-between py-1 px-10 items-center">
                        <h3 className="font-bold">Create New Post</h3>
                        <Button
                            onClick={handleSubmit}
                            className="inline-flex"
                            colorScheme="blue"
                            size={"sm"}
                            variant="ghost"
                        >
                            Share
                        </Button>
                    </div>

                    <hr className="hrLine" />

                    <ModalBody>
                        <div className="modalBodyBox flex h-[70vh] justify-between">
                            <div className="w-[50%]">
                                {!file && (
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        className={`drag-drop h-full`}
                                    >
                                        <div className="flex justify-center flex-col items-center">
                                            <FaPhotoVideo
                                                className={`text-3xl ${
                                                    isDragOver
                                                        ? "text-blue-800"
                                                        : ""
                                                }`}
                                            />
                                            <p>Drag photos here </p>
                                        </div>

                                        <label
                                            for="file-upload"
                                            className="custom-file-upload"
                                        >
                                            Select from computer
                                        </label>
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept="image/*, video/*"
                                            multiple
                                            onChange={(e) => handleOnChange(e)}
                                        />
                                    </div>
                                )}

                                {file && (
                                    <img
                                        className=""
                                        src={URL.createObjectURL(file)}
                                        alt="dropped-img"
                                    />
                                )}
                            </div>
                            <div className="w-[1px] border h-full"></div>
                            <div className="w-[50%]">
                                <div className="flex items-center px-2">
                                    <img
                                        className="w-7 h-7 rounded-full"
                                        src={user?.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt=""
                                    />{" "}
                                    <p className="font-semibold ml-4">
                                        {user?.reqUser?.username}
                                    </p>
                                </div>
                                <div className="px-2">
                                    <textarea
                                        className="captionInput"
                                        placeholder="Write a caption..."
                                        name="caption"
                                        rows="8"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex justify-between px-2">
                                    <GrEmoji />
                                    <p className="opacity-70">
                                        {postData.caption?.length}/2,200
                                    </p>
                                </div>
                                <hr />
                                <div className="p-2 flex justify-between items-center">
                                    <input
                                        className="locationInput"
                                        type="text"
                                        placeholder="Add Location"
                                        name="location"
                                        onChange={handleInputChange}
                                    />
                                    <GoLocation />
                                </div>
                                <hr />
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreatePostModal;
