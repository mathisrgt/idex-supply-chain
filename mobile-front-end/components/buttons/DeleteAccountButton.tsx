import { useState } from "react";
import { Button, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import { Address } from "viem";

interface DeleteAccountButtonProps {
    onRemoveUser: () => Promise<void>; // Callback function to handle the delete action
}

export default function DeleteAccountButton({ onRemoveUser: removeUser }: DeleteAccountButtonProps) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [removeRoleLoading, setRemoveRoleLoading] = useState(false);

    // Open the modal
    const openModal = () => setModalOpen(true);

    // Close the modal
    const closeModal = () => setModalOpen(false);

    // Handle the delete confirmation
    async function handleDelete() {
        setRemoveRoleLoading(true);
        await removeUser();
        setRemoveRoleLoading(false);
        closeModal();
    };

    return (
        <>
            <Button color="danger" variant="light" onPress={openModal}>
                Delete
            </Button>

            <Modal isOpen={isModalOpen} onOpenChange={setModalOpen}
                backdrop="blur"
                placement="center"
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}>
                <ModalContent>
                    <ModalHeader className="text-lg font-bold">Confirm Deletion</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this account? You'll need to add it again before the account can interact with the company's flows.</p>
                    </ModalBody>
                    <ModalFooter className="flex justify-between">
                        <Button variant="light" onPress={closeModal} disabled={removeRoleLoading}>
                            Cancel
                        </Button>
                        <Button color="danger" onPress={handleDelete} disabled={removeRoleLoading}>
                            {removeRoleLoading ? <Spinner color="white" size="sm" /> : "Confirm"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
