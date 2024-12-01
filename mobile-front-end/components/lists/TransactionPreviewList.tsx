"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardContent, CardHeader } from "../ui/card";

// UX (Components)

// Wagmi


export default function TransactionPreviewList() {
    return (
        <>
            <h1>Last transactions</h1>
            <div className="flex flex-col gap-2">
                <Card className="flex-1">
                    <CardHeader></CardHeader>
                    <CardContent>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader></CardHeader>
                    <CardContent>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}