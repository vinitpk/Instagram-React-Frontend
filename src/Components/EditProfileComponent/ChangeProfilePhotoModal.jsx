// This is a React component that displays a modal for changing a profile photo
// Importing necessary components from Chakra UI library
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";

// Declaring the ChangeProfilePhotoModal component which takes props like isOpen, onOpen, onClose, and handleProfileImageChange
function ChangeProfilePhotoModal({
    isOpen,
    onOpen,
    onClose,
    handleProfileImageChange,
    handleProfileImageRemove
}) {
    // Returning JSX code to render the modal with input fields for uploading and removing profile photo
    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>Modal Title</ModalHeader>

                    <ModalBody>
                        <div className="flex flex-col items-center">
                            <label
                                for="profileImage"
                                className="font-bold py-3 text-blue-600 text-center cursor-pointer text-xs w-full"
                            >
                                Upload Photo
                            </label>

                            <input
                                onChange={handleProfileImageChange}
                                type="file"
                                id="profileImage"
                                name="profileImage"
                            />
                        </div>

                        <hr />

                        <p className="font-bold py-3 text-red-600 text-center cursor-pointer" onClick={handleProfileImageRemove}>
                            Remove Photo
                        </p>
                        <hr />
                        <p className=" py-3 text-center" onClick={onClose}>
                            Cancel
                        </p>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

// Exporting the ChangeProfilePhotoModal component as the default export
export default ChangeProfilePhotoModal;
