"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, Input } from "@heroui/react";

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Web3
import AddWoodFlowButton from "../buttons/AddWoodFlowButton";

interface WoodFlowSearchBarParams {
    onSubmitCreateWoodFlow: Function;
}

export default function WoodFlowSearchBar({ onSubmitCreateWoodFlow }: WoodFlowSearchBarParams) {
    return (
        <div className="flex gap-2">
            <Input
                name="search"
                placeholder="Search..."
                aria-label="Search input"
            />
            <AddWoodFlowButton onSubmitCreateWoodFlow={onSubmitCreateWoodFlow} />
        </div>
    );
}
