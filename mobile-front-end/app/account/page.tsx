"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Input, Spinner } from "@heroui/react";
import { Button } from "@heroui/react";
import { Copy } from "lucide-react";

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Web3
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";
import PageTitle from "@/components/text/PageTitle";

import { fetchAllWoodRecordDetails } from "@/services/woodRecord";
import { fetchAllUserRoles } from "@/services/role";
import { fetchAllProductionSiteDetails } from "@/services/productionSites";
import { useAccount, useDisconnect } from "@cometh/connect-react-hooks";
import { shortenAddress } from "@/components/text/TextFormat";
import { useEffect } from "react";
import { waitInSec } from "@/services/other";

export default function Account() {
    useRedirectOnLargeScreen();

    const router = useRouter();

    const { address: accountAddress } = useAccount();
    const { disconnect } = useDisconnect();

    async function checkConnectedAccount() {
        waitInSec(1);
        if (!accountAddress) {
            console.log('Error: You have been disconnected. Redirection...');
            waitInSec(1);
            disconnect();
            router.push('/');
        }
    }

    useEffect(() => {
        checkConnectedAccount();
    }, []);

    return (
        <main className="p-4 flex flex-col min-h-screen gap-4">
            <PageTitle text="Profile" />

            {accountAddress ?
                <>
                    <Input
                        label="Address"
                        labelPlacement="inside"
                        value={shortenAddress(accountAddress)}
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
                        onPress={() => {
                            disconnect();
                            router.push('/');
                        }}
                    >
                        Log out
                    </Button>
                </>
                :
                <div className="flex flex-grow justify-center items-center text-center">
                    {accountAddress ? <Spinner color="default" /> : "You have been disconnected. You will be soon redirected... "}
                </div>
            }
            <NavBar />
        </main>
    );
}
