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
import { HomeChart } from "@/components/charts/homeChart";
import { useEffect } from "react";
import FlowPreviewList from "@/components/lists/FlowPreviewList";

export default function Home() {
    const router = useRouter();

    const { address, isConnected } = useAccount();

    // useEffect(() => {
    //     if (!isConnected) {
    //         router.push('/');
    //     }
    // }, []);

    // TODO If not connected, loading component
    return (
        <>
            <main className="p-4 flex flex-col gap-4">
                <h1 className="text-xl">Home</h1>
                <HomeChart />
                <FlowPreviewList />
            </main>
            <NavBar />
        </>
    );
}
