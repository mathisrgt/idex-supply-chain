"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

// UX (Components)
import NavBar from "@/components/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus } from "lucide-react";
import ActionBar from "@/components/ActionBar";

export default function FlowList() {
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
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Tabs aria-label="Options">
                <Tab key="current" title="Current">
                    <div onClick={onOpen}>
                        <Card className="max-w-[400px]">
                            <CardHeader className="flex gap-3">
                                <div className="flex flex-col">
                                    <p className="text-md">NextUI</p>
                                    <p className="text-small text-default-500">nextui.org</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                        </Card>
                    </div>
                </Tab>
                <Tab key="past" title="Past">
                </Tab>
            </Tabs>
        </>
    );
}
