"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input } from "@nextui-org/react";

// UX (Components)

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus, Search } from "lucide-react";
import FlowCard from "../cards/FlowCard";

export default function FlowList() {
    return (
        <>
            <Input
                placeholder="Search..."
                type="text"
                endContent={
                    <Search className="text-default-400 pointer-events-none flex-shrink-0" size={20} />
                }
                className="flex justify-between w-full"
            />
            <Tabs aria-label="Options">
                <Tab key="current" title="Current">
                    <FlowCard id={7276} />
                </Tab>
                <Tab key="history" title="History" className="flex flex-col gap-4">
                    <FlowCard id={2839} />
                    <FlowCard id={1934} />
                </Tab>
                <Tab key="all" title="All" className="flex flex-col gap-4">
                    <FlowCard id={7276} />
                    <FlowCard id={2839} />
                    <FlowCard id={1934} />
                </Tab>
            </Tabs>
        </>
    );
}
