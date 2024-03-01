/**
 * Uploads an image to Cloudinary.
 * @param {File} image The image file to be uploaded.
 * @returns {string} The URL of the uploaded image.
 */
export const uploadToCloudinary = async (image) => {
    if (image) {
        // Create a FormData object to send the image file
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "InstagramCloneSpringBootReact"); // Specify upload preset
        data.append("cloud_name", "vinitpk"); // Specify Cloudinary cloud name

        // Send a POST request to Cloudinary API to upload the image
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/vinitpk/image/upload",
            {
                method: "post",
                body: data,
            }
        );

        // Parse the response JSON data
        const fileData = await res.json();
        
        // Log the URL of the uploaded image
        console.log("url : ", fileData.url.toString());
        
        // Return the URL of the uploaded image
        return fileData.url.toString();
    } else {
        console.log("error: No image provided"); // Log an error if no image provided
    }
};
