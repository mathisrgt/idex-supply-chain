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
import { Role } from "@/types/users";
import { fetchUserRole } from "@/services/role";
import { fetchAllProductionSiteDetails, fetchProductionSiteDetails } from "@/services/productionSites";
import { ProductionSite } from "@/types/productionSites";

export default function Dashboard() {
    useRedirectOnLargeScreen();

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [loadingProductionSite, setLoadingProductionSite] = useState(true);
    const [woodFlows, setWoodFlows] = useState<WoodFlow[]>();
    const [productionSites, setProductionSites] = useState<ProductionSite[]>();
    const [role, setRole] = useState<Role>();

    const { address: sender, isConnected } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const { disconnect } = useDisconnect();

    async function fetchRole() {
        if (!sender) {
            throw Error('No sender found.');
        }

        try {
            setLoading(true);
            const _userRole = await fetchUserRole(sender, sender);
            setRole(_userRole);

            setLoading(false);
        } catch (error) {
            console.log(error);

            setLoading(false);
            disconnect();
            router.push('/');
        }
    }

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

    async function fetchProductionSites() {
        try {
            setLoadingProductionSite(true);

            const _productionSites = await fetchAllProductionSiteDetails(sender);
            setProductionSites(_productionSites);

            setLoadingProductionSite(false);
        } catch (error) {
            console.log(error);

            setLoadingProductionSite(false);
            disconnect();
            router.push('/');
        }
    }

    async function createWoodFlow(weightInKg: number, woodType: WoodType, cutType: CutType): Promise<void> {
        const lastId = woodFlows && woodFlows.length > 0
            ? Math.max(...woodFlows.map((flow) => Number(flow.id)))
            : -1;

        const newId = lastId + 1;

        console.log(`Creation of the Wood Flow #${newId} by sender ${sender} at contract ${woodTrackerContractAddress} with params: Wood type: ${WoodType[woodType].toString()} / Cut type: ${WoodType[cutType].toString()}`);

        if (!sender)
            throw new Error("CreateWoodFlow Service - Error: No sender specified.");

        if (!(woodType && cutType && weightInKg))
            throw new Error("CreateWoodFlow Service - Error: Missing parameters.");

        try {
            const txHash = await writeContractAsync({
                address: woodTrackerContractAddress,
                abi: woodTrackerContractAbi,
                functionName: "createWoodRecord",
                args: [weightInKg, WoodType[woodType].toString(), WoodType[cutType].toString()],
                account: sender
            });

            console.log("Hash for the wood flow creation: ", txHash);

        } catch (error) {
            console.log("Error creating the wood flow: ", error);
            throw error;
        }

        await fetchWoodFlows();
    }

    useEffect(() => {
        fetchProductionSites();
        fetchWoodFlows();
        fetchRole();
    }, []);

    return (
        <>
            <main className="p-4 flex flex-col gap-4 min-h-screen">
                <PageTitle text="Dashboard" />
                <div className="flex flex-col flex-grow justify-center items-center">
                    {loading || loadingProductionSite ?
                        <Spinner color="default" /> :
                        woodFlows && productionSites ? woodFlows.length === 0 ?
                            <div className="flex flex-col gap-4 items-center">
                                <p>No wood flows recorded 🍃</p>
                                <AddWoodFlowButton onSubmitCreateWoodFlow={createWoodFlow} role={role} productionSite={productionSites.find((productionSite) => { return productionSite.address === sender })} />
                            </div> :
                            <div className="flex flex-col flex-1 w-full gap-4">
                                <WoodFlowSearchBar onSubmitCreateWoodFlow={createWoodFlow} role={role} productionSite={productionSites.find((productionSite) => { return productionSite.address === sender })} />
                                <FlowList woodFlows={woodFlows} productionSites={productionSites} />
                            </div> : "We're sorry, an error occurred while requesting user data."
                    }
                </div>
            </main>
            <NavBar />
        </>
    );
}
