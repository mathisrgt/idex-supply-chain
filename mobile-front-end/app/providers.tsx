"use client";

// React & NextJS
import { ReactNode } from "react";

// UI
import { NextUIProvider } from "@nextui-org/react";

// Web3
import { polygonAmoy } from "viem/chains";
import { http, WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectProvider } from "@cometh/connect-react-hooks";

// Env
import { bundlerUrl, comethApiKey, paymasterUrl } from "@/environment/blockchain/account_abstraction";
import { rpcUrl } from "@/environment/blockchain/rpc";

interface ProvidersProps {
    children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient();

    const config = createConfig({
        chains: [polygonAmoy],
        transports: {
            [polygonAmoy.id]: http(),
        },
        // ssr: true,
    });

    const networksConfig = [
        {
            chain: polygonAmoy,
            bundlerUrl,
            paymasterUrl,
            rpcUrl
        },
    ];

    return <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <ConnectProvider
                config={{
                    apiKey: comethApiKey,
                    networksConfig
                }}
                queryClient={queryClient}
            >
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </ConnectProvider>
        </QueryClientProvider>
    </WagmiProvider>
}