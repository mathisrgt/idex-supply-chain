// UI
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useAccount } from "wagmi";

// Viem
// import { polygonAmoy } from 'viem/chains';

export default function Home() {
  // async function createSmartWallet() {
  //   const smartAccount = await createSafeSmartAccount({
  //     // From the Cometh Dashboard
  //     comethApiKey,

  //     // Chain definition using Chain (Viem) type
  //     chain: polygonAmoy,

  //     // ENTRYPOINT_ADDRESS_V07 will use a Pimlico contract
  //     entryPoint: ENTRYPOINT_ADDRESS_V07,

  //     // Optional: Default PUBLIC RPC URL used is managed by Cometh
  //     rpcUrl,

  //     // Optional: Choose an existing wallet address 
  //     // smartAccountAddress: WALLET_ADDRESS

  //     // Other optional parameters: read here.
  //   });
  // }

  const { address } = useAccount()

  return (
    <main>
      <p>{address}</p>
      <h1>Welcome to IDEX Supply Chain App</h1>
      <Link href="/dashboard"><Button>Start</Button></Link>
    </main>
  );
}
