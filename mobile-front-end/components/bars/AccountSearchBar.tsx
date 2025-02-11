"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, Input } from "@heroui/react";

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus, Search } from "lucide-react";
import ActionBar from "@/components/bars/ActionBar";
import AddAccountButton from "../buttons/AddAccountButton";
import { Address } from "viem";

export default function AccountSearchBar({ onAssignRole: assignRole }: { onAssignRole: Function }) {
    return (
        <div className="flex gap-2">
            <Input
                name="search"
                placeholder="Search..."
                aria-label="Search input"
            />
            <AddAccountButton onAssignRole={assignRole} />
        </div>
    );
}
