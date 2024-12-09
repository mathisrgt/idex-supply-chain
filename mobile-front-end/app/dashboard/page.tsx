"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button } from "@nextui-org/react";

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus } from "lucide-react";
import ActionBar from "@/components/bars/ActionBar";
import FlowList from "@/components/lists/FlowList";
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";
import PageTitle from "@/components/text/PageTitle";

export default function Dashboard() {
    useRedirectOnLargeScreen();

    const router = useRouter();

    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <>
            <main className="p-4 flex flex-col gap-4">
                <PageTitle text="Dashboard" />
                <FlowList />
            </main>
            <NavBar />
        </>
    );
}
