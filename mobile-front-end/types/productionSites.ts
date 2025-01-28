import { Address } from "viem";

export type ProductionSite = {
    address: Address;
    name: string;
    capacity: number;
    permit: string[];
    certificates: string[];
    location: string;
}