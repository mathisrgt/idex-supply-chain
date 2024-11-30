"use client";

// React and NextJS
import { useState } from "react";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { UserRoundPlus } from "lucide-react";

export default function AddAccountButton() {
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
    const [publicAddress, setPublicAddress] = useState(""); // State to store input value

    const openModal = () => setModalOpen(true);

    const closeModal = () => {
        setModalOpen(false);
        setPublicAddress("");
    };

    const handleSubmit = () => {
        console.log("Public Address:", publicAddress);
        closeModal();
    };

    return (
        <>
            <Button onClick={openModal}>
                <UserRoundPlus size={17} />
            </Button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalContent>
                    <ModalHeader>
                        <p>Add a user</p>
                    </ModalHeader>

                    <ModalBody>
                        <Input
                            placeholder="Enter public address"
                            value={publicAddress}
                            onChange={(e) => setPublicAddress(e.target.value)}
                            fullWidth
                        />
                        <Select
                            label="Select a role"
                            fullWidth
                        >
                            <SelectItem key={'admin'}>
                                Admin
                            </SelectItem>
                            <SelectItem key={'other'}>
                                Other
                            </SelectItem>
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
