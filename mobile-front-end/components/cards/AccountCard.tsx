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
import { Address, Hex } from "viem";
import DeleteAccountButton from "../buttons/DeleteAccountButton";
import { Role } from "@/types/role";

interface AccountCardProps {
    address: Address;
    role: Role;
}

export default function AccountCard({ address, role }: AccountCardProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                                    value={address}
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
                                    defaultSelectedKeys={['admin']}
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
                        <p className="text-small text-default-500">{address}</p>
                    </CardBody>
                    <CardFooter>
                        {role === Role.Admin ?
                            <Chip size="sm" color="danger">Admin</Chip> :
                            role === Role.Extractor ?
                                <Chip size="sm" color="danger">Admin</Chip> :
                                <></>
                        }
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
