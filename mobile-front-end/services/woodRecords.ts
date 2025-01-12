import { woodTrackerContractAbi, woodTrackerContractAddress } from "@/environment/blockchain/contract";
import { rpcUrl } from "@/environment/blockchain/rpc";
import { Address, createPublicClient, http, Log, parseAbiItem, decodeEventLog, parseAbi } from "viem";
import { polygonAmoy } from "viem/chains";
import { useAccount } from "wagmi";

const client = createPublicClient({
    chain: polygonAmoy,
    transport: http(rpcUrl),
});

async function fetchWoodRecordsId(): Promise<number[]> {
    const woodRecordCreatedEvent = parseAbi(["event WoodRecordCreated(uint256 indexed id)"]);

    const logs: Log[] = await client.getLogs({
        address: woodTrackerContractAddress,
        event: woodRecordCreatedEvent[0],
        fromBlock: BigInt(0),
        toBlock: "latest",
    });

    const woodRecordIds = logs.map((log) => {
        const decodedLog = decodeEventLog({
            abi: woodRecordCreatedEvent,
            data: log.data,
            topics: log.topics,
        });

        return Number(decodedLog.args.id);
    });

    console.log("fetchWoodRecordsFromLogs: ", woodRecordIds)

    return woodRecordIds;
}

async function fetchWoodRecordDetails(sender: Address, id: number) {
    console.log(`Call to getWoodRecordDetail with address: `, sender);

    const details = await client.readContract({
        address: woodTrackerContractAddress,
        abi: woodTrackerContractAbi,
        functionName: "getWoodRecord",
        args: [id],
        account: sender,
    });

    console.log(`WoodRecord #${id}`, details);

    return details;
}

export async function fetchAllWoodRecordDetails(sender: Address) {
    const result = (await fetchWoodRecordsId()).map((id) => { return fetchWoodRecordDetails(sender, id) });
    console.log('fetchAllWoodRecordDetails: ', result);
    return result;
}
