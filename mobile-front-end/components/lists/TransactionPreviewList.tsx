"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "@nextui-org/react";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import { PageSecondaryTitle } from "../text/PageTitle";
import TransactionCard from "../cards/TransactionCard";

// UX (Components)

// Wagmi


export default function TransactionPreviewList() {
    return (
        <>
            <PageSecondaryTitle text="Last transactions" />
            <div className="flex flex-col gap-2">
                <TransactionCard hash="0x1a5ed...9e5bd" />
                <TransactionCard hash="0x9d3nz...7j5zs" />
            </div>
        </>
    );
}
