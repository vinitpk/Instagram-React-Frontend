import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signinAction } from "../../Redux/Auth/Action";
import { getUserProfileAction } from "../../Redux/User/Action";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
});

const Signin = () => {
    const initialValues = { email: "", password: "" };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, signin } = useSelector((store) => store);
    const toast = useToast();

    const token = localStorage.getItem("token");
    //  If the user is already logged in redirect them to
    useEffect(() => {
        if (token) dispatch(getUserProfileAction(token || signin));
    }, [signin, token]);

    //
    useEffect(() => {
        if (user?.reqUser?.username && token) {
            navigate(`/${user.reqUser?.username}`);
            toast({
                title: "Login successfull",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [user.reqUser]);

    const handleSubmit = (values, actions) => {
        dispatch(signinAction(values));
        actions.setSubmitting(true);
    };

    return (
        <div className=" ">
            <div className="border border-slate-300">
                <Box
                    p={8}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <img
                        className="border border-red-800 mb-5"
                        src="https://i.imgur.com/zqpwkLQ.png"
                        alt=""
                    />

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {(formikProps) => (
                            <Form className="w-full">
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.email &&
                                                form.touched.email
                                            }
                                            mb={4}
                                        >
                                            <Input
                                                className="w-full"
                                                {...field}
                                                id="email"
                                                placeholder="Mobile Number Or Email"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name="password">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.password &&
                                                form.touched.password
                                            }
                                            mb={4}
                                        >
                                            <Input
                                                {...field}
                                                type="password"
                                                id="password"
                                                placeholder="Password"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.password}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <p className="text-center">
                                    People who use our service may have uploaded
                                    your contact information to Instagram. Learn
                                    More
                                </p>
                                <p className="mt-5 text-center">
                                    By signing up, you agree to our Terms ,
                                    Privacy Policy and Cookies Policy .
                                </p>
                                <Button
                                    className="w-full"
                                    mt={4}
                                    colorScheme="blue"
                                    type="submit"
                                    isLoading={formikProps.isSubmitting}
                                >
                                    Sign In
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </div>

            <div className="w-full border border-slate-300 mt-5">
                <p className="text-center py-2">
                    If You Don't Have Already Account{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="ml-2 text-blue-700 cursor-pointer"
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signin;
