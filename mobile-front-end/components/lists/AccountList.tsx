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
import { fetchAllUserRoles } from "@/services/role";
import { useEffect, useState } from "react";
import { Address } from "viem";

export default function AccountList() {
    const [users, setUsers] = useState<{
        address: Address;
        role: number;
    }[]>();

    const { address: sender } = useAccount();

    async function fetchUsers() {
        if (sender != undefined) {
            const response = await fetchAllUserRoles(sender);
            if (response != undefined)
                setUsers(response);
        }
    }
    useEffect(() => {
        fetchUsers();
    }, [sender]);

    return (
        <>
            <div className="flex gap-4">
                {users?.map((user) => {
                    return <AccountCard address={user.address} role={user.role} />;
                })}
            </div>
        </>
    );
}
