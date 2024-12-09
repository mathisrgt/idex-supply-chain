"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Divider, Link, Tabs, Tab, Button, Input, Modal, useDisclosure, ModalBody, ModalContent, ModalFooter, ModalHeader, Badge, Chip, Card, CardHeader, CardBody, CardFooter, Select, SelectItem } from "@nextui-org/react";

// UX (Components)

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Copy, MailIcon, Plus, Search } from "lucide-react";
import { Hex } from "viem";
import DeleteAccountButton from "../buttons/DeleteAccountButton";

interface AccountCardProps {
    name: string;
    address: Hex;
}

export default function AccountCard() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Modal
                backdrop="opaque"
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
                                    label="Name"
                                    labelPlacement="inside"
                                    value="User"
                                    type="text"
                                    disabled
                                    className="flex justify-between w-full"
                                />
                                <Input
                                    label="Address"
                                    labelPlacement="inside"
                                    value="1a2b3c...d4e5f6"
                                    type="text"
                                    disabled
                                    endContent={
                                        <Copy className="text-default-400 pointer-events-none flex-shrink-0" size={20} />
                                    }
                                    className="flex justify-between w-full"
                                />
                                <Select
                                    label="Role"
                                    labelPlacement="inside"
                                    defaultSelectedKeys={['admin']}
                                    className="flex justify-between items-center w-full"
                                >
                                    <SelectItem key={'admin'}>
                                        Admin
                                    </SelectItem>
                                    <SelectItem key={'other'}>
                                        Other
                                    </SelectItem>
                                </Select>
                            </ModalBody>
                            <ModalFooter className="flex justify-between">
                                <DeleteAccountButton onDelete={onClose} />
                                <Button color="primary" onPress={onClose}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div onClick={onOpen} className="flex-1">
                <Card className="shadow-none border">
                    <CardHeader>
                        <p className="text-md">User</p>
                    </CardHeader>
                    <CardBody className="py-0">
                        <p className="text-small text-default-500">0x2a...8u5</p>
                    </CardBody>
                    <CardFooter>
                        <Chip size="sm" color="danger">Admin</Chip>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
