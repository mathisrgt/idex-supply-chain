"use client";

// React and NextJS
import { useState } from "react";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@heroui/react";
import { UserRoundPlus } from "lucide-react";
import { Role } from "@/types/users";
import { Address } from "viem";

export default function AddAccountButton({ onAssignRole: assignRole }: { onAssignRole: Function }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const [userAddress, setUserAddress] = useState<Address>();
    const [role, setRole] = useState<Role>(Role.Admin);

    const openModal = () => setModalOpen(true);

    const closeModal = () => {
        setModalOpen(false);
    };

    function handleSubmit() {
        try {
            assignRole(userAddress, role);
            closeModal();
        } catch (error) {
            console.log('Error: ', userAddress);
        }
    };

    return (
        <>
            <Button onPress={openModal} color="secondary">
                <UserRoundPlus size={17} color="#5b6069" />
            </Button>

            <Modal isOpen={isModalOpen} onClose={closeModal} backdrop="blur"
                placement="center">
                <ModalContent>
                    <ModalHeader>
                        <p>Add a user</p>
                    </ModalHeader>

                    <ModalBody>
                        <Input
                            placeholder="Enter public address"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value as Address)}
                            fullWidth
                        />
                        <Select
                            label="Select a role"
                            fullWidth
                            onChange={(e) => {
                                const roleKey = e.target.value as keyof typeof Role;
                                setRole(Role[roleKey]);
                            }}
                        >
                            {Object.keys(Role).filter((key) => isNaN(Number(key)) && key !== "None").map((_role) => (
                                <SelectItem key={_role} value={_role}>
                                    {_role}
                                </SelectItem>
                            ))}
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button onPress={closeModal} variant="light">
                            Cancel
                        </Button>
                        <Button onPress={handleSubmit} color={userAddress && role ? "primary" : 'secondary'} disabled={!userAddress || !role}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
}
