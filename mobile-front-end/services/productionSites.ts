import { woodTrackerContractAbi, woodTrackerContractAddress } from "@/environment/blockchain/contract";
import { rpcUrl } from "@/environment/blockchain/rpc";
import { Address, createPublicClient, http, Log, parseAbiItem, decodeEventLog, parseAbi } from "viem";
import { polygonAmoy } from "viem/chains";

const client = createPublicClient({
    chain: polygonAmoy,
    transport: http(rpcUrl),
});

async function fetchProductionSiteCreated(): Promise<Address[]> {
    const productionSiteCreatedEvent = parseAbi(["event ProductionSiteCreated(address indexed productionSite)"]);

    const logs: Log[] = await client.getLogs({
        address: woodTrackerContractAddress,
        event: productionSiteCreatedEvent[0],
        fromBlock: BigInt(0),
        toBlock: "latest",
    });

    const siteAddresses = logs.map((log) => {
        const decodedLog = decodeEventLog({
            abi: productionSiteCreatedEvent,
            data: log.data,
            topics: log.topics,
        });

        return decodedLog.args.productionSite as Address;
    });

    console.log("fetchProductionSiteCreated: ", siteAddresses);

    return siteAddresses;
}

async function fetchProductionSiteDetails(sender: Address, siteAddress: Address) {
    console.log(`Call to getProductionSite with address: `, sender);

    const details = await client.readContract({
        address: woodTrackerContractAddress,
        abi: woodTrackerContractAbi,
        functionName: "getProductionSite",
        args: [siteAddress],
        account: sender,
    });

    console.log(`ProductionSite Details for ${siteAddress}:`, details);

    return details;
}

export async function fetchAllProductionSiteDetails(sender: Address) {
    const siteAddresses = await fetchProductionSiteCreated();

    const siteDetails = await Promise.all(
        siteAddresses.map(async (siteAddress) => {
            const details = await fetchProductionSiteDetails(sender, siteAddress);
            return { siteAddress, details };
        })
    );

    console.log("fetchAllProductionSiteDetails: ", siteDetails);

    return siteDetails;
}

