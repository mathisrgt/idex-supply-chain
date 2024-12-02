"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, Input } from "@nextui-org/react";

// UX (Components)

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus, Search } from "lucide-react";
import AccountCard from "../cards/AccountCard";

export default function AccountList() {

    return (
        <>
            <div className="flex gap-4">
                <AccountCard />
                <AccountCard />
            </div>
        </>
    );
}
