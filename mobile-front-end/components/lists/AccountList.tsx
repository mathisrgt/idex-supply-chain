"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, Input } from "@nextui-org/react";

// UX (Components)
import NavBar from "@/components/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus, Search } from "lucide-react";
import ActionBar from "@/components/ActionBar";

export default function AccountList() {

    return (
        <>
            <div className="flex gap-2">
                <Input
                    name="search"
                    placeholder="Search..."
                    aria-label="Search input"
                />
                <Button type="submit">
                    <Plus size={17} />
                </Button>
            </div >
            <div className="flex">
                <Card className="w-1/2">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">NextUI</p>
                            <p className="text-small text-default-500">nextui.org</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
                <Card className="w-1/2">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">NextUI</p>
                            <p className="text-small text-default-500">nextui.org</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
