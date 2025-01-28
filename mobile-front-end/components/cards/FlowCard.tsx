"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Chip } from "@heroui/react";

// UX (Components)

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Calendar, CalendarClock, Edit2, GitCommit, MapPinHouse, Plus, Truck, Weight } from "lucide-react";
import { Hex } from "viem";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { WoodFlow, WoodState } from "@/types/woodFlows";
import { ProductionSite } from "@/types/productionSites";

export default function FlowCard({ woodFlow, productionSite }: { woodFlow: WoodFlow, productionSite: ProductionSite }) {
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
                            <ModalHeader className="flex flex-col gap-1">WoodFlow #{woodFlow.id}</ModalHeader>
                            <ModalBody className="flex gap-4 pt-0">

                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-2 items-center">
                                        <CalendarClock size={20} />
                                        <p>--/--/2025</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <GitCommit size={20} />
                                        <p>{WoodState[woodFlow.state].toString()}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Weight size={20} />
                                        <p>{woodFlow.weightInKg} kg</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <MapPinHouse size={20} />
                                        <p>{productionSite.location}</p>
                                    </div>
                                </div>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Last Updates</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-3">
                                                <Table>
                                                    <TableBody>
                                                        <TableRow key="1">
                                                            <TableCell>08/12/2024</TableCell>
                                                            <TableCell>New owner</TableCell>
                                                        </TableRow>
                                                        <TableRow key="2">
                                                            <TableCell>05/12/2024</TableCell>
                                                            <TableCell>Transport</TableCell>
                                                        </TableRow>
                                                        <TableRow key="3">
                                                            <TableCell>05/12/2024</TableCell>
                                                            <TableCell>New owner</TableCell>
                                                        </TableRow>
                                                        <TableRow key="4">
                                                            <TableCell>04/12/2024</TableCell>
                                                            <TableCell>Production</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
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
                            <p className="text-md">WoodFlow #{woodFlow.id}</p>
                        </div>
                    </CardHeader>
                    <CardFooter className="pt-0 flex gap-2">
                        <Chip className="flex">
                            <Truck size={15} />
                        </Chip>
                        <Chip>
                            {woodFlow.weightInKg} kg
                        </Chip>
                        <Chip>Paris, France</Chip>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
