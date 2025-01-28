"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Divider, Link, Tabs, Tab, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Chip } from "@heroui/react";

// UX (Components)

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Calendar, CalendarClock, Edit2, GitCommit, LucideEdit, MapPin, MapPinHouse, MapPinnedIcon, Package, Plus, Settings2, Truck, UserMinus, UserMinus2, UserPlus2, UserPlusIcon, UserRound, Weight } from "lucide-react";
import { Hex } from "viem";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Card, CardFooter, CardHeader } from "../ui/card";

interface TransactionCardProps {
    hash: Hex;
}

export default function TransactionCard(props: TransactionCardProps) {
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
                            <ModalHeader className="flex flex-col gap-1">Updated Owner</ModalHeader>
                            <ModalBody className="flex gap-4 pt-0">

                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-2 items-center">
                                        <Package size={20} />
                                        <Link className="underline">1a2b...3e4f</Link>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <GitCommit size={20} />
                                        <p>Shipping</p>
                                    </div>
                                    <Divider />
                                    <div className="flex gap-2 items-center">
                                        <CalendarClock size={20} />
                                        <p>08/12/2024</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <MapPinnedIcon size={20} />
                                        <p>Paris, France</p>
                                    </div>
                                    <Divider />
                                    <div className="flex gap-2 items-center">
                                        <Settings2 size={20} />
                                        <p>Update owner</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <UserMinus2 size={20} />
                                        <Link className="underline">Mathis</Link>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <UserPlus2 size={20} />
                                        <Link className="underline">Amaury</Link>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-between">
                                <Button color="primary" variant="light" onPress={onClose}>
                                    See more
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
                    <CardHeader className="flex p-4">
                        <p className="text-md p-0 font-medium">Updated data: flow owner</p>
                        <p className="text-xs p-0 m-0">{props.hash}</p>
                    </CardHeader>
                    <CardFooter className="flex gap-2 p-4 pt-0 pb-4">
                        <Chip variant="flat">
                            <UserRound size={15} />
                        </Chip>
                        <Chip className="" variant="flat">
                            {/* <CalendarClock size={15} /> */}
                            <p>1 days ago</p>
                        </Chip>
                        <Chip className="" variant="flat">
                            {/* <MapPin size={15} /> */}
                            <p>Paris, France</p>
                        </Chip>
                    </CardFooter>
                </Card>
            </div >
        </>
    );
}
