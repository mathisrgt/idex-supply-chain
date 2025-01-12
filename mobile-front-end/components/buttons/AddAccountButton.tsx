"use client";

// React and NextJS
import { useState } from "react";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { UserRoundPlus } from "lucide-react";
import { Role } from "@/types/role";

export default function AddAccountButton() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [publicAddress, setPublicAddress] = useState("");

    const openModal = () => setModalOpen(true);

    const closeModal = () => {
        setModalOpen(false);
        setPublicAddress("");
    };

    const handleSubmit = () => {
        // TODO
        closeModal();
    };

    return (
        <>
            <Button onClick={openModal} color="secondary">
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
                            {Object.keys(Role).filter((key) => isNaN(Number(key)) && key !== "None").map((role) => (
                                <SelectItem key={role}>
                                    {role}
                                </SelectItem>
                            ))}
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={closeModal} variant="light">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
