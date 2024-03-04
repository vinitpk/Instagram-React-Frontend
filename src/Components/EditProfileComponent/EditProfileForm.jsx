// Import necessary components and functions
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
    useToast,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Stack,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import {
    editUserDetailsAction,
    getUserProfileAction,
} from "../../Redux/User/Action";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import ChangeProfilePhotoModal from "./ChangeProfilePhotoModal";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../Redux/Config";

// Create and export the EditProfileForm component
const EditProfileForm = () => {
    // Get user data and necessary hooks from Redux store and Chakra UI
    const { user } = useSelector((store) => store);
    const toast = useToast();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    // Set initial form values for user details
    const [initialValues, setInitialValues] = useState({
        name: "",
        username: "",
        email: "",
        bio: "",
        mobile: "",
        gender: "",
        website: "",
        private: false,
    });

    // Fetch user profile data when component mounts or token changes
    useEffect(() => {
        dispatch(getUserProfileAction(token));
    }, [token]);

    // Update form values when user profile data changes
    useEffect(() => {
        const newValue = {};
        for (let item in initialValues) {
            if (user.reqUser && user.reqUser[item]) {
                newValue[item] = user.reqUser[item];
            }
        }
        formik.setValues(newValue);
    }, [user.reqUser]);

    // Formik configuration for form handling
    const formik = useFormik({
        initialValues: { ...initialValues },
        onSubmit: (values) => {
            const data = {
                jwt: token,
                data: { ...values, id: user.reqUser?.id },
            };
            dispatch(editUserDetailsAction(data));
            // Show a success toast message after submitting the form
            toast({
                title: "Account updated...",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Navigate to user profile page after updating details and reload the page
            window.location.href = `/${user?.reqUser?.username}`;
        },
    });

    // Handle profile image change event
    async function handleProfileImageChange(event) {
        const selectedFile = event.target.files[0];
        const image = await uploadToCloudinary(selectedFile);
        setImageFile(image);
        const data = {
            jwt: token,
            data: { image, id: user.reqUser?.id },
        };
        dispatch(editUserDetailsAction(data));
        onClose();
    }

    // Handle profile image remove event
    async function handleProfileImageRemove(event) {
        const data = {
            jwt: token,
            data: { image:"remove", id: user.reqUser?.id },
        };
        dispatch(editUserDetailsAction(data));
        console.log("removed")
        onClose();
    }

    // Render the form with user details and input fields
    return (
        <div className="border rounded-md p-10">
            <div className="flex pb-7">
                <div className="w-[15%]">
                    <img
                        className="w-8 h-8 rounded-full"
                        src={
                            imageFile ||
                            user.reqUser?.image ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt=""
                    />
                </div>

                <div>
                    <p>{user.reqUser?.username}</p>
                    <p
                        onClick={onOpen}
                        className="font-bold text-blue-800 cursor-pointer"
                    >
                        Change Profile Photo
                    </p>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing="6">
                    <FormControl className="flex " id="name">
                        <FormLabel className="w-[15%]">Name</FormLabel>
                        <div className="w-full">
                            <Input
                                placeholder="Name"
                                className="w-full"
                                type="text"
                                {...formik.getFieldProps("name")}
                            />
                            <FormHelperText className="text-xs">
                                Help people discover your account by using the
                                name you're known by: either your full name,
                                nickname, or business name.
                            </FormHelperText>
                            <FormHelperText className="text-xs">
                                You can only change your name twice within 14
                                days.
                            </FormHelperText>
                        </div>
                    </FormControl>
                    <FormControl className="flex " id="username">
                        <FormLabel className="w-[15%]">Username</FormLabel>
                        <div className="w-full">
                            <Input
                                placeholder="Username"
                                className="w-full"
                                type="text"
                                {...formik.getFieldProps("username")}
                            />
                            <FormHelperText className="text-xs">
                                In most cases, you'll be able to change your
                                username back to ashok.zarmariya for another 14
                                days. Learn more
                            </FormHelperText>
                        </div>
                    </FormControl>
                    <FormControl className="flex " id="website">
                        <FormLabel className="w-[15%]">Website</FormLabel>
                        <div className="w-full">
                            <Input
                                placeholder="Website"
                                className="w-full"
                                type="text"
                                {...formik.getFieldProps("website")}
                            />
                            <FormHelperText className="text-xs">
                                Editing your links is only available on mobile.
                                Visit the Instagram app and edit your profile to
                                change the websites in your bio.
                            </FormHelperText>
                        </div>
                    </FormControl>
                    <FormControl className="flex " id="bio">
                        <FormLabel className="w-[15%]">Bio</FormLabel>
                        <div className="w-full">
                            <Textarea
                                placeholder="Bio"
                                className="w-full"
                                type="text"
                                {...formik.getFieldProps("bio")}
                            />
                        </div>
                    </FormControl>

                    <div className="py-10">
                        <p className="font-bold text-sm">
                            Personal information
                        </p>
                        <p className="text-xs">
                            Provide your personal information, even if the
                            account is used for a business, a pet or something
                            else. This won't be a part of your public profile.
                        </p>
                    </div>

                    <FormControl className="flex " id="email">
                        <FormLabel className="w-[15%]">Email address</FormLabel>
                        <div className="w-full">
                            <Input
                                placeholder="Email"
                                className="w-full"
                                type="email"
                                {...formik.getFieldProps("email")}
                            />
                        </div>
                    </FormControl>

                    <FormControl className="flex " id="mobile">
                        <FormLabel className="w-[15%]">Phone number</FormLabel>
                        <div className="w-full">
                            <Input
                                placeholder="Phone"
                                className="w-full"
                                type="tel"
                                {...formik.getFieldProps("mobile")}
                            />
                        </div>
                    </FormControl>
                    <FormControl className="flex " id="gender">
                        <FormLabel className="w-[15%]">Gender</FormLabel>
                        <div className="w-full">
                            <Input
                                placeholder="Gender"
                                className="w-full"
                                type="text"
                                {...formik.getFieldProps("gender")}
                            />
                        </div>
                    </FormControl>
                    {/* <FormControl className="flex " id="private">
            <Checkbox {...formik.getFieldProps("private")}>
              Pr className="w-full"ivate Account
            </Checkbox>
          </FormControl> */}

                    <div>
                        <Button colorScheme="blue" type="submit" className="">
                            submit
                        </Button>
                    </div>
                </Stack>
            </form>

            <ChangeProfilePhotoModal
                handleProfileImageChange={handleProfileImageChange}
                handleProfileImageRemove={handleProfileImageRemove}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
            />
        </div>
    );
};

export default EditProfileForm;
