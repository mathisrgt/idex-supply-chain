"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, Input, Modal, useDisclosure, ModalBody, ModalContent, ModalFooter, ModalHeader, Badge, Chip } from "@nextui-org/react";

// UX (Components)

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus, Search } from "lucide-react";

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
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div onClick={onOpen} className="flex-1">
                <Card>
                    <CardBody>
                        <div className="flex flex-col gap-1">
                            <div>
                                <p className="text-md">Name</p>
                                <p className="text-small text-default-500">Address</p>
                            </div>
                            <div className="flex gap-1">
                                <Chip size="sm">Admin</Chip>
                                <Chip size="sm">Extractor</Chip>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
