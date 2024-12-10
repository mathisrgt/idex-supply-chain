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
                            <SelectItem key={'admin'}>
                                Admin
                            </SelectItem>
                            <SelectItem key={'extractor'}>
                                Extractor
                            </SelectItem>
                            <SelectItem key={'transporter'}>
                                Transporter
                            </SelectItem>
                            <SelectItem key={'warehouse'}>
                                Warehouse
                            </SelectItem>
                            <SelectItem key={'manufacturer'}>
                                Manufacturer
                            </SelectItem>
                            <SelectItem key={'controller'}>
                                Reader
                            </SelectItem>
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
