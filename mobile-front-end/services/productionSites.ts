import { woodTrackerContractAbi, woodTrackerContractAddress } from "@/environment/blockchain/contract";
import { rpcUrl } from "@/environment/blockchain/rpc";
import { ProductionSite } from "@/types/productionSites";
import { Address, createPublicClient, http, Log, parseAbiItem, decodeEventLog, parseAbi } from "viem";
import { polygonAmoy } from "viem/chains";
import { wait } from "./other";

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

export async function fetchProductionSiteDetails(sender: Address, siteAddress: Address): Promise<ProductionSite> {
    console.log(`Call to getProductionSite with address: `, sender);

    const details: any = await client.readContract({
        address: woodTrackerContractAddress,
        abi: woodTrackerContractAbi,
        functionName: "getProductionSite",
        args: [siteAddress],
        account: sender,
    });

    console.log(`ProductionSite Response for ${siteAddress}:`, details);

    const siteDetails: ProductionSite = {
        address: sender,
        name: details.name,
        capacity: Number(details.capacity),
        permit: details.permit,
        certificates: details.certificates,
        location: details.location
    };

    console.log(`ProductionSite Details for ${siteAddress}:`, siteDetails);

    return siteDetails as ProductionSite;
}

export async function fetchAllProductionSiteDetails(sender: Address | undefined): Promise<ProductionSite[]> {
    if (!sender)
        throw Error('Production Site Service - Error: No sender specified.');

    const siteAddresses = await fetchProductionSiteCreated();

    const siteDetails = [];
    for (const siteAddress of siteAddresses) {
        await wait(500);
        const details = await fetchProductionSiteDetails(sender, siteAddress);
        siteDetails.push(details);
    }

    console.log("fetchAllProductionSiteDetails: ", siteDetails);

    return siteDetails;
}

