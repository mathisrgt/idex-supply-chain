"use client";

// React & NextJS
import { ReactNode } from "react";

// UI
import { NextUIProvider } from "@nextui-org/react";

// Web3
import type { Hex } from "viem";
import { polygonAmoy } from "viem/chains";
import { http, WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { smartAccountConnector } from "@cometh/connect-sdk-4337";

// Env
import { bundlerUrl, comethApiKey, paymasterUrl } from "@/environment/blockchain/account_abstraction";
import { rpcUrl } from "@/environment/blockchain/rpc";

interface ProvidersProps {
    children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient();

    const connector = smartAccountConnector({
        chain: polygonAmoy,
        apiKey: comethApiKey,
        bundlerUrl,
        rpcUrl,
        paymasterUrl
    });

    const web3Config = createConfig({
        chains: [polygonAmoy],
        connectors: [connector],
        transports: {
            [polygonAmoy.id]: http(),
        },
        // ssr: true, // To avoid client - server rendering errors
    });

    return <WagmiProvider config={web3Config}>
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </QueryClientProvider>
    </WagmiProvider>
}