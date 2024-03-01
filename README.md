# Instagram Clone Frontend

This project is a frontend implementation of an Instagram-like application built using React, Redux, and Tailwind CSS. It consumes the Instagram API Spring Boot backend.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/vinitpk/Instagram-React-Frontend.git
```

To run this project locally, follow these steps:

2. Navigate to the project directory:

```
cd Instagram-React-Frontend
```

3. Install dependencies using npm or yarn:

```
npm install
# or
yarn install

```

4. Start the development server:

```
npm start
# or
yarn start
```

5. The application will be available at
   `http://localhost:3000`

## Features

**Authentication :** Allows users to sign up, log in, and log out securely.\
**Feed :** Displays posts from followed users and allows users to like, comment, and save posts.\
**Profile :** Shows user profile information, including posts, followers, and following.\
**Search :** Enables users to search for other users and view their profiles.\
**Stories :** Allows users to view and create stories, similar to Instagram stories.\
**Responsive Design:** Ensures the application works seamlessly across various devices.

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Tech Stack

**React:** A JavaScript library for building user interfaces.\
**Redux:** A predictable state container for managing application state.\
**Tailwind CSS:** A utility-first CSS framework for building custom designs quickly.

**Server:** Java, Spring Boot, MySQL

## Endpoints

Base URL

```
http://localhost:3000/
```

#### User Endpoints

**Sign In:** POST /users/signin\
**Sign Up:** POST /users/signup\
**Fetch User Profile:** GET /users/profile\
**Find User By Username:** GET /users/username/{username}\
**Find Users By User IDs:** GET /users/m/{userIds}\
**Follow User:** PUT /users/follow/{userId}\
**Unfollow User:** PUT /users/unfollow/{userId}\
**Search User:** GET /users/search?q={query}\
**Edit User Details:** PUT /users/account/edit\

#### Post Endpoints

**Create New Post:** POST /posts/create\
**Fetch User Posts:** GET /posts/following/{userIds}\
**Fetch Single Post:** GET /posts/{postId}\
**Like Post:** PUT /posts/like/{postId}\
**Unlike Post:** PUT /posts/unlike/{postId}\
**Save Post:** PUT /posts/save-post/{postId}\
**Unsave Post:** PUT /posts/unsave-post/{postId}\
**Delete Post:** DELETE /posts/delete/{postId}\

#### Comment Endpoints

**Create Comment:** POST /comments/create/{postId}\
**Fetch Post Comments:** GET /comments/{postId}\
**Like Comment:** PUT /comments/{commentId}\
**Unlike Comment:** PUT /comments/{commentId}\

#### Story Endpoints

**Create User Story:** POST /stories/create\
**Fetch Following User Stories:** GET /stories/f/{userIds}\
**Fetch User Stories:** GET /stories/{userId}\
**Delete Story:** DELETE /stories/delete/{storyId}

## Authors

-   [@vinitpk](https://www.github.com/vinitpk)

## Acknowledgements

-   This project was inspired by the functionalities of Instagram.\
-   Thanks to the creators of React, Redux, and Tailwind CSS for their amazing tools.

This README provides information on how to run the frontend application locally, its features, and the technologies used.
