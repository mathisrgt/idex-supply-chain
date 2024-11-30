"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button } from "@nextui-org/react";

// UX (Components)
import NavBar from "@/components/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus } from "lucide-react";
import ActionBar from "@/components/ActionBar";
import FlowList from "@/components/lists/FlowList";

export default function Dashboard() {
    const router = useRouter();

    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <>
            <main className="p-4 flex flex-col gap-4">
                <h1>Dashboard</h1>
                <FlowList />
            </main>
            <NavBar />
        </>
    );
}
