"use client";

// React & Next.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// UI
import { Button } from "@nextui-org/react";

// Wagmi
import { useAccount, useConnect } from "wagmi";

export default function Home() {
  const router = useRouter();

  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();

  async function connectWithWagmi() {
    connect({ chainId: 80002, connector: connectors[0] });
  };

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected]);

  return (
    <main>
      <p>{isConnected}</p>
      {address && <p>{address}</p>}
      <h1>Welcome</h1>
      <Button onClick={connectWithWagmi}>Start</Button>
    </main>
  );
}
