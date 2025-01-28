import { Abi, Address } from "viem";

if (process.env.NEXT_PUBLIC_WOODTRACKER_CONTRACT_ADDRESS === undefined)
    throw new Error('NEXT_PUBLIC_WOODTRACKER_CONTRACT_ADDRESS is undefined');

if (!process.env.NEXT_PUBLIC_WOODTRACKER_CONTRACT_ADDRESS.match(/^0x[a-fA-F0-9]{40}$/)) {
    throw new Error("NEXT_PUBLIC_WOODTRACKER_CONTRACT_ADDRESS: Invalid EVM address format");
}

export const woodTrackerContractAddress = process.env.NEXT_PUBLIC_WOODTRACKER_CONTRACT_ADDRESS as Address;

export const woodTrackerContractAbi: Abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "ContractOwnerUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "productionSite",
                "type": "address"
            }
        ],
        "name": "ProductionSiteCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "productionSite",
                "type": "address"
            }
        ],
        "name": "ProductionSiteUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "RoleAssigned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "UserRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "WoodRecordCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "WoodRecordDataUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "WoodRecordStateUpdated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "certificate",
                "type": "string"
            }
        ],
        "name": "addCertificate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "permit",
                "type": "string"
            }
        ],
        "name": "addPermit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "enum WoodTracker.Role",
                "name": "role",
                "type": "uint8"
            }
        ],
        "name": "assignRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "capacity",
                "type": "uint256"
            },
            {
                "internalType": "string[]",
                "name": "permit",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "certificates",
                "type": "string[]"
            },
            {
                "internalType": "string",
                "name": "location",
                "type": "string"
            }
        ],
        "name": "createProductionSite",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "weightInKg",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "woodType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "cutType",
                "type": "string"
            }
        ],
        "name": "createWoodRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "siteAddress",
                "type": "address"
            }
        ],
        "name": "getProductionSite",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "capacity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "permit",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string[]",
                        "name": "certificates",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    }
                ],
                "internalType": "struct WoodTracker.ProductionSite",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getRole",
        "outputs": [
            {
                "internalType": "enum WoodTracker.Role",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "getWoodRecord",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "weightInKg",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "woodType",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "cutType",
                        "type": "string"
                    },
                    {
                        "internalType": "enum WoodTracker.WoodState",
                        "name": "state",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "currentResponsible",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "productionSite",
                        "type": "address"
                    }
                ],
                "internalType": "struct WoodTracker.WoodRecord",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "removeUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "capacity",
                "type": "uint256"
            }
        ],
        "name": "updateProductionSite",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "enum WoodTracker.WoodState",
                "name": "newState",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "newWeightInKg",
                "type": "uint256"
            }
        ],
        "name": "updateWoodRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

