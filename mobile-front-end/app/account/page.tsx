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
import { fetchAllWoodRecordDetails } from "@/services/woodRecord";
import { fetchAllUserRoles } from "@/services/role";

export default function Account() {
    useRedirectOnLargeScreen();

    const router = useRouter();

    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    if (!isConnected || !address)
        throw Error('Wallet not connected');

    return (
        <main className="p-4 flex flex-col gap-4">
            <PageTitle text="Profile" />
            <Input
                label="Address"
                labelPlacement="inside"
                value={address}
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

            {/* <Button
                color="default"
                className="w-full"
                onClick={() => {
                    fetchWoodRecordDetails(address, 1);
                }}
            >
                Test call Wood Record #1
            </Button> */}

            <Button
                color="default"
                className="w-full"
                onClick={() => {
                    fetchAllWoodRecordDetails(address);
                }}
            >
                Test call fetchAllWoodRecordDetails
            </Button>

            <Button
                color="default"
                className="w-full"
                onClick={() => {
                    fetchAllUserRoles(address);
                }}
            >
                Test call fetchAllUserRoles
            </Button>

            <NavBar />
        </main >
    );
}
