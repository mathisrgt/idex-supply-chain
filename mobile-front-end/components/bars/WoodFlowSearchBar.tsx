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
import { Role } from "@/types/users";
import { ProductionSite } from "@/types/productionSites";

interface WoodFlowSearchBarParams {
    onSubmitCreateWoodFlow: Function;
    role: Role | undefined;
    productionSite?: ProductionSite;
}

export default function WoodFlowSearchBar({ onSubmitCreateWoodFlow, role, productionSite }: WoodFlowSearchBarParams) {
    return (
        <div className="flex gap-2">
            <Input
                name="search"
                placeholder="Search..."
                aria-label="Search input"
            />
            <AddWoodFlowButton onSubmitCreateWoodFlow={onSubmitCreateWoodFlow} role={role} productionSite={productionSite} />
        </div>
    );
}
