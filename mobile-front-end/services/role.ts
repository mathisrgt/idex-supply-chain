import { woodTrackerContractAddress, woodTrackerContractAbi } from "@/environment/blockchain/contract";
import { rpcUrl } from "@/environment/blockchain/rpc";
import { Address, createPublicClient, decodeEventLog, http, Log, parseAbi } from "viem";
import { polygonAmoy } from "viem/chains";

const client = createPublicClient({
    chain: polygonAmoy,
    transport: http(rpcUrl),
});

async function fetchUserCreated(): Promise<Address[]> {
    const roleAssignedEvent = parseAbi(["event RoleAssigned(address indexed user)"]);

    const logs: Log[] = await client.getLogs({
        address: woodTrackerContractAddress,
        event: roleAssignedEvent[0],
        fromBlock: BigInt(0),
        toBlock: "latest",
    });

    const userAddresses = logs.map((log) => {
        const decodedLog = decodeEventLog({
            abi: roleAssignedEvent,
            data: log.data,
            topics: log.topics,
        });

        return decodedLog.args.user as Address;
    });

    console.log("fetchUserCreated: ", userAddresses);

    return userAddresses;
}

async function fetchUserRole(sender: Address, user: Address): Promise<number> {
    console.log(`Call to fetchUserRole with address: `, sender);

    const roleId = await client.readContract({
        address: woodTrackerContractAddress,
        abi: woodTrackerContractAbi,
        functionName: "getRole",
        args: [user],
        account: sender,
    });

    return Number(roleId);
}

export async function fetchAllUserRoles(sender: Address): Promise<{ user: Address; role: number }[]> {
    const userAddresses = await fetchUserCreated();

    const userRoles = await Promise.all(
        userAddresses.map(async (user) => {
            const role = await fetchUserRole(sender, user);
            return { user, role };
        })
    );

    console.log("fetchAllUserRoles: ", userRoles);

    return userRoles;
}
