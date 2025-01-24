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
import { WoodFlow } from "@/types/woodFlows";

export default function FlowList({ woodFlows }: { woodFlows: WoodFlow[] }) {
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
            {woodFlows.map((woodFlow) => {
                return <FlowCard woodFlow={woodFlow} />
            })}
        </>
    );
}
