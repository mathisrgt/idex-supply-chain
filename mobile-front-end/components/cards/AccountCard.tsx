"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Button, Input, Modal, useDisclosure, ModalBody, ModalContent, ModalFooter, ModalHeader, Chip, Card, CardHeader, CardBody, CardFooter, Select, SelectItem, Spinner } from "@heroui/react";

// UX (Components)

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Copy, MailIcon, Plus, Search } from "lucide-react";
import { Address, Hex } from "viem";
import DeleteAccountButton from "../buttons/DeleteAccountButton";
import { Role } from "@/types/users";
import { shortenAddress } from "../text/TextFormat";
import { useState } from "react";

interface AccountCardProps {
    userAddress: Address;
    role: Role;
    onAssignRole: Function;
    onRemoveUser: Function;
}

export default function AccountCard({ userAddress, role, onAssignRole: assignRole, onRemoveUser: removeUser }: AccountCardProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [editRoleLoading, setEditRoleLoading] = useState(false);

    async function handleEditRole(onClose: () => void) {
        setEditRoleLoading(true);
        try {
            await assignRole(userAddress, role);
            onClose();
        } catch (error) {
            console.error("Error: Unable to edit role.", error);
        }
        setEditRoleLoading(false);
    }

    async function handleRemoveUser(onClose: () => void) {
        setEditRoleLoading(true);
        try {
            await removeUser(userAddress);
            onClose();
        } catch (error) {
            console.error("Error: Unable to remove user.", error);
        }
        setEditRoleLoading(false);
    }

    return (
        <>
            <Modal
                backdrop="blur"
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
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
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit user</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Address"
                                    labelPlacement="inside"
                                    value={shortenAddress(userAddress)}
                                    type="text"
                                    disabled
                                    endContent={
                                        <Copy className="text-default-400 pointer-events-none flex-shrink-0" size={20} />
                                    }
                                    className="flex justify-between w-full"
                                    classNames={{
                                        label: [
                                            "!text-default-500",
                                        ],
                                        input: [
                                            "!text-default-500",
                                        ],
                                    }}
                                />
                                <Select
                                    label="Role"
                                    labelPlacement="inside"
                                    defaultSelectedKeys={[Role[role].toString().toLowerCase()]}
                                    className="flex justify-between items-center w-full"
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
                            <ModalFooter className="flex justify-between">
                                <DeleteAccountButton onRemoveUser={async () => handleRemoveUser(onClose)} />
                                <Button color="primary" onPress={() => handleEditRole(onClose)}>
                                    {editRoleLoading ? <Spinner color="default" size="sm" /> : "Save"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div onClick={onOpen} className="w-1/2">
                <Card className="shadow-none border m-2">
                    <CardBody className="py-0 mt-4">
                        <p className="text-small text-default-500">{shortenAddress(userAddress)}</p>
                    </CardBody>
                    <CardFooter>
                        {role === Role.Admin ?
                            <Chip size="sm" color="danger">Admin</Chip> :
                            role === Role.Extractor ?
                                <Chip size="sm" color="success">Extractor</Chip> :
                                <></>
                        }
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
