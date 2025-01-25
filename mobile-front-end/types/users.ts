import { Address } from "viem";

export type User = {
    address: Address;
    role: Role;
}

export enum Role {
    None = 0,
    Requester = 1,
    Admin = 2,
    Extractor = 3,
    Transporter = 4,
    Warehouse = 5,
    Manufacturer = 6,
    Client = 7,
    Viewer = 8,
}


