"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input } from "@heroui/react";

// UX (Components)

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus, Search } from "lucide-react";
import FlowCard from "../cards/FlowCard";
import { WoodFlow } from "@/types/woodFlows";
import AddWoodFlowButton from "../buttons/AddWoodFlowButton";

export default function FlowList({ woodFlows }: { woodFlows: WoodFlow[] }) {
    return (
        <div className="flex flex-col gap-4">
            {woodFlows.map((woodFlow, id) => {
                return <FlowCard woodFlow={woodFlow} key={id} />
            })}
        </div>
    );
}
