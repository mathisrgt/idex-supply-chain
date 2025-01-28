import { woodTrackerContractAddress, woodTrackerContractAbi } from "@/environment/blockchain/contract";
import { rpcUrl } from "@/environment/blockchain/rpc";
import { Address, createPublicClient, decodeEventLog, http, Log, parseAbi } from "viem";
import { polygonAmoy } from "viem/chains";
import { wait, waitInSec } from "./other";
import { useAccount } from "@cometh/connect-react-hooks";

const client = createPublicClient({
    chain: polygonAmoy,
    transport: http(rpcUrl),
});

async function fetchUsers(): Promise<Address[]> {
    const roleAssignedEvent = parseAbi(["event RoleAssigned(address indexed user)"]);

    const logs: Log[] = await client.getLogs({
        address: woodTrackerContractAddress,
        event: roleAssignedEvent[0],
        fromBlock: BigInt(0),
        toBlock: "latest",
    });

    const uniqueUserAddresses = new Set<Address>();

    logs.map((log) => {
        const decodedLog = decodeEventLog({
            abi: roleAssignedEvent,
            data: log.data,
            topics: log.topics,
        });

        const user = decodedLog.args.user as Address;
        uniqueUserAddresses.add(user);
    });

    const userAddresses = Array.from(uniqueUserAddresses);

    console.log("fetchUserCreated (unique): ", userAddresses);

    return userAddresses;
}

export async function fetchUserRole(sender: Address, user: Address): Promise<number> {
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

export async function fetchAllUserRoles(sender: Address | undefined): Promise<{ address: Address; role: number }[]> {
    console.log('SERVICE - USER ROLES');

    console.log('Sender: ', sender);

    if (!sender)
        throw Error('User Roles Service - Error: No sender specified.');

    const userAddresses = await fetchUsers();

    const userRoles = [];
    for (const address of userAddresses) {
        await wait(500);
        const role = await fetchUserRole(sender, address);
        userRoles.push({ address, role });
    }

    console.log("User Roles: ", userRoles);

    return userRoles;
}

