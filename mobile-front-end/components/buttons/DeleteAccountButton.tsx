import { useState } from "react";
import { Button, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";

interface DeleteAccountButtonProps {
    onDelete: () => void; // Callback function to handle the delete action
}

export default function DeleteAccountButton({ onDelete }: DeleteAccountButtonProps) {
    const [isModalOpen, setModalOpen] = useState(false);

    // Open the modal
    const openModal = () => setModalOpen(true);

    // Close the modal
    const closeModal = () => setModalOpen(false);

    // Handle the delete confirmation
    const handleDelete = () => {
        onDelete(); // Call the provided onDelete callback
        closeModal(); // Close the modal
    };

    return (
        <>
            {/* Delete Button */}
            <Button color="danger" variant="light" onPress={openModal}>
                Delete
            </Button>

            {/* Confirmation Modal */}
            <Modal isOpen={isModalOpen} onOpenChange={setModalOpen} backdrop="opaque">
                <ModalContent>
                    <ModalHeader className="text-lg font-bold">Confirm Deletion</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this account? You'll need to add it again before the account can interact with the company's flows.</p>
                    </ModalBody>
                    <ModalFooter className="flex justify-between">
                        <Button variant="light" onPress={closeModal}>
                            Cancel
                        </Button>
                        <Button color="danger" onPress={handleDelete}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
