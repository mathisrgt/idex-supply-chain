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
import PageTitle from "@/components/text/PageTitle";
import { Copy } from "lucide-react";

export default function Account() {
    useRedirectOnLargeScreen();

    const router = useRouter();

    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <main className="p-4 flex flex-col gap-4">
            <PageTitle text="Profile" />
            <Input
                label="Address"
                labelPlacement="inside"
                value="1a2b3c...d4e5f6"
                type="text"
                disabled
                endContent={
                    <Copy className="text-default-500 pointer-events-none flex-shrink-0" size={20} />
                }
                className="flex justify-between w-full"
                classNames={{
                    label: [
                        "!text-default-500",
                    ],
                    input: [
                        "!text-default-500",
                    ],
                }}
            />
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
