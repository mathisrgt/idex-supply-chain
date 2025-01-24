import { woodTrackerContractAddress, woodTrackerContractAbi } from "@/environment/blockchain/contract";
import { rpcUrl } from "@/environment/blockchain/rpc";
import { Address, createPublicClient, decodeEventLog, http, Log, parseAbi } from "viem";
import { polygonAmoy } from "viem/chains";
import { wait } from "./other";
import { useAccount } from "@cometh/connect-react-hooks";

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

    await wait(300);

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

    const userAddresses = await fetchUserCreated();

    const userRoles = await Promise.all(
        userAddresses.map(async (address) => {
            const role = await fetchUserRole(sender, address);
            return { address, role };
        })
    );

    console.log("User Roles: ", userRoles);

    return userRoles;
}

/**
 * Assigns a role to a user on the blockchain.
 * @param sender The address of the sender (must be an Admin).
 * @param user The address of the user to whom the role is being assigned.
 * @param role The role to assign (as a number corresponding to the Role enum).
 */
export async function assignRole(sender: Address, user: Address | undefined, role: number): Promise<void> {
    console.log(`Assigning role ${role} to user ${user} by sender ${sender}`);

    if (!sender)
        throw new Error("AssignRole Service - Error: No sender specified.");

    if (!user)
        throw new Error("AssignRole Service - Error: No user specified.");

    if (role <= 0)
        throw new Error("AssignRole Service - Error: Invalid role. Must be greater than 0.");

    try {
        const txHash = await walletClient.writeContract({
            address: woodTrackerContractAddress,
            abi: woodTrackerContractAbi,
            functionName: "assignRole",
            args: [user, role],
            account: sender,
        });

        console.log("Transaction hash for assigning role: ", txHash);
    } catch (error) {
        console.log("Error assigning role: ", error);
        throw error;
    }
}