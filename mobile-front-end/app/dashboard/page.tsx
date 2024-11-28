"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'

export default function Dashboard() {
    const router = useRouter();

    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return (

        isConnected ?
            <main>
                <h1>Welcome to IDEX Supply Chain App</h1>
                <Card className="max-w-[400px]">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">NextUI</p>
                            <p className="text-small text-default-500">nextui.org</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link showAnchorIcon>
                            Visit source code on GitHub.
                        </Link>
                    </CardFooter>
                </Card>
                <Button color="danger" onClick={() => {
                    disconnect();
                    router.push('/');
                }}>
                    Disconnect
                </Button>
            </main>
            :
            <>
                <h1>You are disconnected.</h1>
                <Link href="/"><Button>Back to homepage</Button></Link>
            </>

    );
}
