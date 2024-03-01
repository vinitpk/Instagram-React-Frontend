/**
 * Checks if two user IDs are the same.
 * @param {string} userId1 The ID of the first user.
 * @param {string} userId2 The ID of the second user.
 * @returns {boolean} True if the user IDs are the same, otherwise false.
 */
export const isReqUser = (userId1, userId2) => {
    if (userId1 && userId2) return userId1 === userId2;
};

/**
 * Checks if a user is following another user.
 * @param {object} reqUser The user performing the request.
 * @param {object} user2 The user to check if being followed.
 * @returns {boolean} True if the reqUser is following user2, otherwise false.
 */
export const isFollowing = (reqUser, user2) => {
    if (reqUser && user2) {
        for (let item of user2.follower) {
            if (reqUser.id === item.id) return true;
        }
    }

    return false;
};

/**
 * Generates suggestions for users to follow based on reqUser's followers and following.
 * @param {object} reqUser The user performing the request.
 * @returns {array} An array of suggested users.
 */
export const suggetions = (reqUser) => {
    const set = new Set(reqUser.following.map((item) => JSON.stringify(item)));

    const result = reqUser.follower.filter((item) => {
        return !set.has(JSON.stringify(item));
    });

    return result;
};

/**
 * Checks if a post has been saved by a user.
 * @param {object} user The user performing the request.
 * @param {string} postId The ID of the post to check.
 * @returns {boolean} True if the post is saved by the user, otherwise false.
 */
export const isSavedPost = (user, postId) => {
    for (let item of user.savedPost) {
        if (item.id === postId) return true;
    }
    return false;
};

/**
 * Checks if a post is liked by a user.
 * @param {object} post The post to check.
 * @param {string} userId The ID of the user to check.
 * @returns {boolean} True if the post is liked by the user, otherwise false.
 */
export const isPostLikedByUser = (post, userId) => {
    for (let item of post.likedByUsers) {
        if (item.id === userId) return true;
    }

    return false;
};

/**
 * Checks if a comment is liked by a user.
 * @param {object} comment The comment to check.
 * @param {string} userId The ID of the user to check.
 * @returns {boolean} True if the comment is liked by the user, otherwise false.
 */
export const isCommentLikedByUser = (comment, userId) => {
    for (let item of comment.likedByUsers) {
        if (item.id === userId) return true;
    }
    return false;
};

/**
 * Checks if a post was made by the requesting user.
 * @param {object} post The post to check.
 * @param {object} reqUser The user performing the request.
 * @returns {boolean} True if the post was made by the reqUser, otherwise false.
 */
export const isReqUserPost = (post, reqUser) => {
    return post.user.id === reqUser.id;
};

/**
 * Helper function to get the time in hours from a timestamp.
 * @param {number} timestamp The timestamp to convert to hours.
 * @returns {number} The time in hours.
 */
function getTimeInHours(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    return hours;
}

/**
 * Filters out users who have stories posted within the last 24 hours.
 * @param {array} users An array of users.
 * @returns {array} An array of users who have stories within the last 24 hours.
 */
export const hasStory = (users) => {
    const temp = users.reduce((acc, item) => {
        if (item.stories?.length > 0) {
            const time = getTimeInHours(
                item.stories[item.stories?.length - 1].timestamp
            );
            if (time < 24) {
                acc.push(item);
            }
        }
        return acc;
    }, []);

    return temp;
};

/**
 * Filters out stories posted within the last 24 hours.
 * @param {array} stories An array of stories.
 * @returns {array} An array of stories posted within the last 24 hours.
 */
export const activeStory = (stories) => {
    const temp = stories.reduce((acc, item) => {
        const time = getTimeInHours(item.timestamp);
        if (time < 24) {
            acc.push(item);
        }

        return acc;
    }, []);

    return temp;
};

/**
 * Calculates the time difference between a timestamp and the current time.
 * @param {number} timestamp The timestamp to calculate the time difference from.
 * @returns {string} A string representing the time difference in human-readable format.
 */
export function timeDifference(timestamp) {
    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
    } else if (days > 0) {
        return days + " day" + (days === 1 ? "" : "s") + " ago";
    } else if (hours > 0) {
        return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    } else if (minutes > 0) {
        return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    } else {
        return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
    }
}
