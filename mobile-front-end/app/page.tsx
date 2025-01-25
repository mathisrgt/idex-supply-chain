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
import { useAccount, useConnect, useWriteContract } from "@cometh/connect-react-hooks";
import { Address } from "viem";
import { shortenAddress } from "@/components/text/TextFormat";
import { waitInSec } from "@/services/other";
import { LogIn } from "lucide-react";
import { woodTrackerContractAbi, woodTrackerContractAddress } from "@/environment/blockchain/contract";
import { fetchUserRole } from "@/services/role";
import { Role } from "@/types/users";

export default function Home() {
  useRedirectOnLargeScreen();

  const [walletAddress, setWalletAddress] = useState<Address | null>();
  const [role, setRole] = useState<Role | null>();

  const router = useRouter();

  const { isPending, connectAsync, error: connectError } = useConnect();
  const { address: sender, isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  /**
      * Assigns a role to a user on the blockchain.
      * @param sender The address of the sender (must be an Admin).
      * @param user The address of the user to whom the role is being assigned.
      * @param role The role to assign (as a number corresponding to the Role enum).
      */
  async function requestRole(): Promise<void> {
    console.log(`Request access for ${sender} at contract ${woodTrackerContractAddress}`);

    if (!sender)
      throw new Error("AssignRole Service - Error: No sender specified.");

    try {
      const txHash = writeContract({
        address: woodTrackerContractAddress,
        abi: woodTrackerContractAbi,
        functionName: "requestRole",
        args: [],
        account: sender
      });

      console.log("Transaction hash for assigning role: ", txHash);
    } catch (error) {
      console.log("Error assigning role: ", error);
      throw error;
    }
  }

  async function connectWallet() {
    if (!walletAddress)
      throw Error("No wallet found.");

    console.log("Connect with address:", walletAddress);
    await connectAsync({ address: walletAddress });
  };

  async function newAccount() {
    localStorage.setItem("walletAddress", '');

    console.log("Creation of a new account.");
    await connectAsync();
    await saveAccount();
    await requestRole();
  }

  async function checkExistingAccount() {
    const _walletAddress = localStorage.getItem("walletAddress");

    if (_walletAddress) {
      setWalletAddress(_walletAddress as Address);
      console.log("Existing account: ", _walletAddress);
      await checkRole();
    } else {
      console.log("No account found.")
    }
  }

  async function checkLoggedAccountAndRedirect() {
    if (isConnected) {
      router.push("/home");
    }
  }

  async function saveAccount() {
    if (sender) {
      localStorage.setItem("walletAddress", sender);
      setWalletAddress(walletAddress);
      console.log("Wallet address: ", sender);
    }
  }

  async function checkRole() {
    if (walletAddress && sender) {
      try {
        const _role = await fetchUserRole(sender, sender);
        localStorage.setItem('role', _role.toString());
        setRole(_role);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  useEffect(() => {
    checkLoggedAccountAndRedirect();
  }, [sender]);

  useEffect(() => {
    checkExistingAccount();
  }, [])

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


        <div className="flex flex-col gap-4 w-full">
          {walletAddress && <h1 className="text-lg text-white mt-24 z-10 title">Welcome back, {shortenAddress(walletAddress)}.</h1>}

          <Button
            onClick={() => { role ? connectWallet() : requestRole() }} color={"primary"} className={`w-full ${isPending || !!connectError || role === Role.Requester.valueOf() ? "bg-zinc-800" : ""}`} size="lg" disabled={isPending || isConnected || !!connectError || role === Role.Requester.valueOf()}>
            {isPending ? "Loading..." :
              connectError !== null ? "Connection denied" :
                walletAddress ?
                  role ? "Request access" :
                    role === Role.Requester.valueOf() ? "Waiting for access approval." : "Sign in"
                  :
                  "Register"
            }
          </Button>
          {walletAddress && !(role === Role.Requester.valueOf()) && <Button
            onClick={requestRole} className={`w-full ${isPending || !!connectError || role === Role.Requester.valueOf() ? "bg-zinc-800" : ""}`} color="primary" size="lg" disabled={isPending || isConnected || !!connectError}>
            {isPending ? "Loading..." : connectError !== null ? "Connection denied" : "New account"}
          </Button>}
        </div>
      </div>
    </main >
  );
}
