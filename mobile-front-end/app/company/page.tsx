"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button } from "@nextui-org/react";

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { ArrowRightSquare, Plus } from "lucide-react";
import ActionBar from "@/components/bars/ActionBar";
import AccountList from "@/components/lists/AccountList";
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";
import AccountSearchBar from "@/components/bars/AccountSearchBar";
import PageTitle from "@/components/text/PageTitle";


// Features: 
// - Company caracteristics
// - Actuals users and their rights
// - Add new users
// - Update rights

export default function Company() {
    useRedirectOnLargeScreen();

    return (
        <>
            <main className="p-4 flex flex-col gap-4">
                <PageTitle text="Company" />
                <AccountSearchBar />
                <AccountList />
            </main>
            <NavBar />
        </>
    );
}
