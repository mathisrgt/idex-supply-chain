"use client";

// React & Next.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// UI
import { Button } from "@nextui-org/react";

// Web3
import Image from "next/image";
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";
import { bundlerUrl, comethApiKey } from "@/environment/blockchain/account_abstraction";
import { rpcUrl } from "@/environment/blockchain/rpc";
import { polygonAmoy } from "viem/chains";
import { useAccount, useConnect } from "@cometh/connect-react-hooks";
import { Address } from "viem";

export default function Home() {
  useRedirectOnLargeScreen();

  const [walletAddress, setWalletAddress] = useState<Address | null>();

  const router = useRouter();

  const { isPending, connectAsync, error: connectError } = useConnect();
  const { address, isConnected } = useAccount();

  const connectWallet = async () => {
    if (walletAddress) {
      console.log("Try to connect with address:", walletAddress);
      connectAsync({ address: walletAddress });
    }
    else {
      console.log("No wallet found.");
      connectAsync();
    }
  };

  useEffect(() => {
    if (address) {
      localStorage.setItem("walletAddress", address);
      setWalletAddress(walletAddress);
      console.log("Wallet address: ", address);
    }
  }, [address]);

  useEffect(() => {
    const _walletAddress = localStorage.getItem("walletAddress");
    if (_walletAddress) setWalletAddress(_walletAddress as Address);

    if (isConnected) {
      router.push("/home");
    }
  }, [isConnected]);

  return (
    <main className="relative flex items-center justify-center min-h-screen">
      <div className="absolute inset-0">
        <Image
          src="/homepage_background.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-between min-h-screen w-full p-8 text-center">
        <h1 className="text-2xl text-white mt-24 z-10 title">WoodTracker</h1>
        <Button
          onClick={connectWallet} className="w-full" color={isPending ? "default" : "primary"} size="lg" disabled={isPending || isConnected || !!connectError}>
          {isPending ? "Loading..." : connectError !== null ? "Connection denied" : "Start"}
        </Button>
      </div>
    </main >
  );
}
