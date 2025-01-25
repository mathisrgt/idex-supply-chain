"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, Spinner } from "@nextui-org/react";

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus } from "lucide-react";
import ActionBar from "@/components/bars/ActionBar";
import FlowList from "@/components/lists/FlowList";
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";
import PageTitle from "@/components/text/PageTitle";
import { useEffect, useState } from "react";
import { WoodFlow } from "@/types/woodFlows";
import { waitInSec } from "@/services/other";
import { fetchAllWoodRecordDetails } from "@/services/woodRecord";

export default function Dashboard() {
    useRedirectOnLargeScreen();

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [woodFlows, setWoodFlows] = useState<WoodFlow[]>();

    const { address: sender, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    async function fetchWoodFlows() {
        await waitInSec(1);

        try {
            const _woodFlows = await fetchAllWoodRecordDetails(sender);
            setWoodFlows(_woodFlows);

            setLoading(false);
        } catch (error) {
            console.log(error);

            setLoading(false);
            router.push('/');
        }
    }

    useEffect(() => {
        fetchWoodFlows();
    }, []);

    return (
        <>
            <main className="p-4 flex flex-col gap-4">
                <PageTitle text="Dashboard" />
                {loading ?
                    <Spinner color="default" /> :
                    woodFlows ? <FlowList woodFlows={woodFlows} /> : "We're sorry, an error occurred while requesting user data."
                }
            </main>
            <NavBar />
        </>
    );
}
