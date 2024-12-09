"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "@nextui-org/react";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import { PageSecondaryTitle } from "../text/PageTitle";

// UX (Components)

// Wagmi


export default function TransactionPreviewList() {
    return (
        <>
            <PageSecondaryTitle text="Last transactions" />
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
                <Button color="primary">
                    All transactions
                    <ArrowRight size={15} />
                </Button>
            </div>
        </>
    );
}
