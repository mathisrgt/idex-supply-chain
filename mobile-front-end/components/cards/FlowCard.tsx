"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Chip } from "@nextui-org/react";

// UX (Components)

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus, Truck, Weight } from "lucide-react";
import { Hex } from "viem";

interface FlowCardProps {
    id: number;
    // ownerAddress: Hex;
}

export default function FlowCard(props: FlowCardProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
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
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">WoodFlow #{props.id}</ModalHeader>
                            <ModalBody>
                                <div>
                                    <Weight />
                                    <p>45 kg</p>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-between">
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Update
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Ok
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div onClick={onOpen}>
                <Card className="max-w-[400px] shadow-none border">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">WoodFlow #{props.id}</p>
                        </div>
                    </CardHeader>
                    <CardFooter className="pt-0 flex gap-2">
                        <Chip className="flex">
                            <Truck size={15} />
                        </Chip>
                        <Chip>
                            45kg
                        </Chip>
                        <Chip>Paris, France</Chip>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
