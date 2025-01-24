import { Address } from "viem";

export enum WoodState {
    Harvested,
    Transported,
    Stored,
    Processed,
    Delivered
}

export type WoodFlow = {
    id: number;
    origin: number[];
    weightInKg: number;
    woodType: string;
    cutType: string;
    state: WoodState;
    currentResponsible: Address;
    productionSite: Address;
}