"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, Spinner } from "@heroui/react";

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Wagmi
import { Plus } from "lucide-react";
import ActionBar from "@/components/bars/ActionBar";
import FlowList from "@/components/lists/FlowList";
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";
import PageTitle from "@/components/text/PageTitle";
import { useEffect, useState } from "react";
import { CutType, WoodFlow, WoodType } from "@/types/woodFlows";
import { waitInSec } from "@/services/other";
import { fetchAllWoodRecordDetails } from "@/services/woodRecord";
import { useAccount, useDisconnect, useWriteContract } from "@cometh/connect-react-hooks";
import WoodFlowSearchBar from "@/components/bars/WoodFlowSearchBar";
import AddWoodFlowButton from "@/components/buttons/AddWoodFlowButton";
import { woodTrackerContractAbi, woodTrackerContractAddress } from "@/environment/blockchain/contract";

export default function Dashboard() {
    useRedirectOnLargeScreen();

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [woodFlows, setWoodFlows] = useState<WoodFlow[]>();

    const { address: sender, isConnected } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const { disconnect } = useDisconnect();

    async function fetchWoodFlows() {
        try {
            setLoading(true);
            const _woodFlows = await fetchAllWoodRecordDetails(sender);
            setWoodFlows(_woodFlows);

            setLoading(false);
        } catch (error) {
            console.log(error);

            setLoading(false);
            disconnect();
            router.push('/');
        }
    }

    async function createWoodFlow(weightInKg: number, woodType: WoodType, cutType: CutType): Promise<void> {
        const lastId = woodFlows && woodFlows.length > 0
            ? Math.max(...woodFlows.map((flow) => Number(flow.id)))
            : 0;

        const newId = lastId + 1;

        console.log(`Creation of the Wood Flow #${newId} by sender ${sender} at contract ${woodTrackerContractAddress} with params:\n
                - Wood type: ${woodType}\n
                - Cut type: ${cutType}\n
                `);

        if (!sender)
            throw new Error("CreateWoodFlow Service - Error: No sender specified.");

        if (!(woodType && cutType && weightInKg))
            throw new Error("CreateWoodFlow Service - Error: Missing parameters.");

        try {
            await writeContractAsync({
                address: woodTrackerContractAddress,
                abi: woodTrackerContractAbi,
                functionName: "createWoodRecord",
                args: [weightInKg, woodType, cutType],
                account: sender
            });

        } catch (error) {
            console.log("Error creating the wood flow: ", error);
            throw error;
        }

        await fetchWoodFlows();
    }

    useEffect(() => {
        fetchWoodFlows();
    }, []);

    return (
        <>
            <main className="p-4 flex flex-col gap-4 min-h-screen">
                <PageTitle text="Dashboard" />
                <div className="flex flex-col flex-grow justify-center items-center">
                    {loading ?
                        <Spinner color="default" /> :
                        woodFlows ? woodFlows.length === 0 ?
                            <div className="flex flex-col gap-4 items-center">
                                <p>No wood flows recorded 🍃</p>
                                <AddWoodFlowButton onSubmitCreateWoodFlow={createWoodFlow} />
                            </div> :
                            <div className="flex flex-col flex-1 w-full gap-4">
                                <WoodFlowSearchBar onSubmitCreateWoodFlow={createWoodFlow} />
                                <FlowList woodFlows={woodFlows} />
                            </div> : "We're sorry, an error occurred while requesting user data."
                    }
                </div>
            </main>
            <NavBar />
        </>
    );
}
