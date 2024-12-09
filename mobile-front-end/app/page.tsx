"use client";

// React & Next.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// UI
import { Button } from "@nextui-org/react";

// Wagmi
import { useAccount, useConnect } from "wagmi";
import Image from "next/image";
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";

export default function Home() {
  useRedirectOnLargeScreen();

  const router = useRouter();

  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();

  async function connectWithWagmi() {
    connect({ chainId: 80002, connector: connectors[0] });
  };

  useEffect(() => {
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
          onClick={connectWithWagmi} className="w-full" color="primary" size="lg">
          Start
        </Button>
      </div>
    </main>
  );
}
