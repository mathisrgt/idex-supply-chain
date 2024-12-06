"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi';
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";

export default function Account() {
    useRedirectOnLargeScreen();

    const router = useRouter();

    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <main className="p-4 flex flex-col gap-4">
            <h1>Profile</h1>
            <Input placeholder={address} disabled />
            <Button
                color="danger"
                className="w-full"
                onClick={() => {
                    disconnect();
                    router.push('/');
                }}
            >
                Disconnect
            </Button>
            <NavBar />
        </main>
    );
}
