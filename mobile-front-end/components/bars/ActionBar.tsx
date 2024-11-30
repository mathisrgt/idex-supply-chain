"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button } from "@nextui-org/react";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Pencil, Plus } from "lucide-react";

export default function ActionBar() {
    return (
        <div className="w-full flex gap-2">
            <Button variant="bordered" className="flex-1" size="lg">
                <Plus />
            </Button>
            <Button variant="bordered" className="flex-1" size="lg">
                <Pencil />
            </Button>
            <Button variant="bordered" className="flex-1" size="lg">
                <Plus />
            </Button>
        </div>
    );
}
