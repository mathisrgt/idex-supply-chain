import { Address } from "viem";

export enum WoodType {
    Oak,
    Pine,
    Cedar,
    Birch,
    Mahogany,
}

export enum CutType {
    Rough,
    Smooth,
    Plank,
    Beam,
    Veneer,
}

export enum WoodState {
    Harvested,
    Transported,
    Stored,
    Processed,
    Delivered
}

export type WoodFlow = {
    id: number;
    weightInKg: number;
    woodType: string;
    cutType: string;
    state: WoodState;
    currentResponsible: Address;
    productionSite: Address;
}