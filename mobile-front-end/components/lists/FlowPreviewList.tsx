"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI

// UX (Components)
import NavBar from "@/components/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus } from "lucide-react";
import ActionBar from "@/components/ActionBar";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function FlowPreviewList() {
    return (
        <>
            <h1>Last flows</h1>
            <div className="flex">
                <Card className="flex-1">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">NextUI</p>
                            <p className="text-small text-default-500">nextui.org</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">NextUI</p>
                            <p className="text-small text-default-500">nextui.org</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
