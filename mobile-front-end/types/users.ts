import { Address } from "viem";

export type User = {
    address: Address;
    role: Role;
}

export enum Role {
    None = 0,
    Admin = 1,
    Extractor = 2,
    Transporter = 3,
    Warehouse = 4,
    Manufacturer = 5,
    Client = 6,
    Viewer = 7,
}


