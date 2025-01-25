"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, Input, Spinner } from "@nextui-org/react";

// UX (Components)

// Wagmi
import { Plus, Search } from "lucide-react";
import AccountCard from "../cards/AccountCard";
import { fetchAllUserRoles } from "@/services/role";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount } from "@cometh/connect-react-hooks";
import { User } from "@/types/users";

interface AccountListProps {
    users: User[];
    onAssignRole: Function;
    onRemoveUser: Function;
}

export default function AccountList({ users, onAssignRole: assignRole, onRemoveUser: removeUser }: AccountListProps) {
    return (
        <>
            <div className="flex flex-wrap">
                {users.sort((a, b) => a.role - b.role).map((user, id) => {
                    return <AccountCard key={id} userAddress={user.address} role={user.role} onAssignRole={assignRole} onRemoveUser={removeUser} />;
                })}
            </div>
        </>
    );
}
