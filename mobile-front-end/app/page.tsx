"use client";

// React & Next.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// UI
import { Alert, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, useDisclosure } from "@heroui/react";


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
import { CutType, WoodType } from "@/types/woodFlows";

export default function Home() {
  useRedirectOnLargeScreen();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [requestRoleLoading, setRequestRoleLoading] = useState(false);
  const [requestSiteCreationLoading, setRequestSiteCreationLoading] = useState(false);

  const [role, setRole] = useState<Role | null>();
  const [requestedRole, setRequestedRole] = useState<Role | null>();

  const [productionSiteName, setProductionSiteName] = useState<string>("");
  const [capacity, setCapacity] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("");

  const [permitFileName, setPermitFileName] = useState<string | null>(null);
  const [certificateFileName, setCertificateFileName] = useState<string | null>(null);

  const router = useRouter();

  const { isPending, connectAsync, error: connectError } = useConnect();
  const { address: sender, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  async function connectWallet() {
    const _walletAddress = localStorage.getItem("walletAddress");

    if (!_walletAddress)
      throw Error("No wallet found.");

    console.log("Connect with address:", _walletAddress);

    try {
      await connectAsync({ address: _walletAddress as Address });
      console.log('Connection succeed.');
    } catch (error) {
      console.error(error);
    }
  };

  async function newAccount() {
    localStorage.setItem("walletAddress", '');

    await waitInSec(1);

    console.log("Creation of a new account.");

    setLoading(true);

    try {
      await connectAsync();
      await saveAccount();
      await checkRole();
    } catch (error) {
      console.error(error)
    }

    setLoading(false);
  }

  async function checkExistingAccount() {
    const _walletAddress = localStorage.getItem("walletAddress");

    if (_walletAddress) {
      console.log("Existing account: ", _walletAddress);

      await connectWallet();
      await checkRole();
    } else {
      console.log("No account found.")
    }
  }

  async function saveAccount() {
    console.log('Save wallet address: ', sender);

    if (sender) {
      localStorage.setItem("walletAddress", sender);
      console.log("Wallet address: ", sender);
    }
  }

  async function checkRole() {
    if (sender) {
      waitInSec(1);

      console.log("Check role for ", sender);

      try {
        const _role = await fetchUserRole(sender, sender);

        localStorage.setItem('role', _role.toString());
        setRole(_role);

      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  // async function createProductionSite(_role: number | null | undefined): Promise<void> {
  //   console.log(`Assigning role ${role} for ${sender} at contract ${woodTrackerContractAddress}`);

  //   if (!sender)
  //     throw new Error("AssignRole Service - Error: No sender specified.");

  //   if (!_role)
  //     throw new Error("AssignRole Service - Error: Invalid role.");

  //   try {
  //     const txHash = writeContract({
  //       address: woodTrackerContractAddress,
  //       abi: woodTrackerContractAbi,
  //       functionName: "assignRole",
  //       args: [sender, _role],
  //       account: sender
  //     });

  //     console.log("Transaction hash for assigning role: ", txHash);
  //   } catch (error) {
  //     console.log("Error assigning role: ", error);
  //     throw error;
  //   }
  // }

  async function assignRole(_role: number | null | undefined): Promise<void> {
    console.log(`Assigning role ${_role} for ${sender} at contract ${woodTrackerContractAddress}`);

    if (!sender)
      throw new Error("AssignRole Service - Error: No sender specified.");

    if (!_role)
      throw new Error("AssignRole Service - Error: Invalid role.");

    if (_role === Role.Extractor.valueOf() && !(productionSiteName && capacity && permitFileName && certificateFileName && location))
      throw new Error("AssignRole Service - Error: Missing parameters for Extractor.");

    try {
      await writeContractAsync({
        address: woodTrackerContractAddress,
        abi: woodTrackerContractAbi,
        functionName: "assignRole",
        args: [sender, _role],
        account: sender
      });
    } catch (error) {
      console.log("Error assigning role: ", error);
      throw error;
    }

    if (_role === Role.Extractor.valueOf()) {
      try {
        await writeContractAsync({
          address: woodTrackerContractAddress,
          abi: woodTrackerContractAbi,
          functionName: "createProductionSite",
          args: [productionSiteName, capacity, [permitFileName], [certificateFileName], location],
          account: sender
        });

        setProductionSiteName("");
        setCapacity(0);
        setPermitFileName(null);
        setCertificateFileName(null);
        setLocation("");
      } catch (error) {
        console.log("Error creating production site: ", error);
        throw error;
      }
    }
  }

  async function handleRequestRole(onClose: () => void) {
    console.log(`Request role ${requestedRole} for ${sender}`)

    setRequestRoleLoading(true);

    try {
      await assignRole(requestedRole);
      await checkRole();
    } catch (error) {
      console.error("Error: Unable to request role.", error);
    }

    setRequestRoleLoading(false);

    onClose();
  }

  useEffect(() => {
    checkRole();
  }, [sender]);

  useEffect(() => {
    checkExistingAccount();
  }, []);

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

      <Modal
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}

      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Request access</ModalHeader>
              <ModalBody className="gap-4">
                <Alert color="warning" title="In this demo version, access requests are automatically approved." />
                {(requestedRole && requestedRole.valueOf() === Role.Extractor) ? <Alert color="primary" title="2 confirmations will be required" /> : <></>}

                <Select
                  label="Select a role"
                  fullWidth
                  onChange={(e) => {
                    const roleKey = e.target.value as keyof typeof Role;
                    setRequestedRole(Role[roleKey]);
                    console.log("requestedRole:", Role[roleKey]);
                  }}
                >
                  {Object.keys(Role).filter((key) => isNaN(Number(key)) && key !== "None").map((_role) => (
                    <SelectItem key={_role} value={_role}>
                      {_role}
                    </SelectItem>
                  ))}
                </Select>

                {requestedRole === Role.Extractor.valueOf() ?
                  <>
                    <Input
                      name="name"
                      label="Name"
                      placeholder="Ex: Dumoulin Bois"
                      required
                      className="w-full"
                      value={productionSiteName}
                      onChange={(e) => setProductionSiteName(e.target.value)}
                    />

                    <Input
                      name="capacity"
                      label="Capacity (kg)"
                      placeholder="Ex: 1200"
                      type="number"
                      required
                      className="w-full"
                      onChange={(e) => setCapacity(Number(e.target.value))}
                    />

                    <Input
                      name="address"
                      label="Address"
                      placeholder="Ex: 3 Av. Du Bois, 92000 Nanterre"
                      className="w-full"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />

                    <div className="flex flex-row gap-2">
                      <div className="flex-1">
                        <Button
                          className="w-full"
                          variant="flat"
                          onPress={() => document.getElementById("permit-upload")?.click()}
                        >
                          {permitFileName ?? "Permits"}
                        </Button>
                        <input
                          type="file"
                          id="permit-upload"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.length) {
                              setPermitFileName(shortenAddress(e.target.files[0].name));
                            }
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <Button
                          className="w-full"
                          variant="flat"
                          onPress={() => document.getElementById("certificate-upload")?.click()}
                        >
                          {certificateFileName ?? "Certificates"}
                        </Button>
                        <input
                          type="file"
                          id="certificate-upload"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.length) {
                              setCertificateFileName(shortenAddress(e.target.files[0].name));
                            }
                          }}
                        />
                      </div>
                    </div>
                  </> :
                  <></>
                }
              </ModalBody>

              <ModalFooter className="flex justify-start">
                <Button color={(requestedRole === Role.Extractor.valueOf() && productionSiteName && capacity && location && permitFileName && certificateFileName) || (requestedRole && requestedRole !== Role.Extractor.valueOf()) ? "primary" : "secondary"} onPress={() => handleRequestRole(onClose)} disabled={!requestedRole || (requestedRole === Role.Extractor.valueOf() && (!productionSiteName || !capacity || !location || !permitFileName || !certificateFileName))}>
                  {requestRoleLoading ? <Spinner color="default" size="sm" /> : "Submit"}
                </Button>
              </ModalFooter>
            </>

          )}
        </ModalContent>
      </Modal >

      <div className="flex flex-col items-center justify-between min-h-screen w-full p-8 text-center">
        <h1 className="text-2xl text-white z-10 title">WoodTracker</h1>

        <div className="flex flex-col gap-4 w-full">
          <div className="z-10 mb-5">
            {sender && <h1 className="text-lg text-white z-10 title">Welcome back, {shortenAddress(sender)}.</h1>}
            {role ? <h1 className="text-lg text-white mt-2 mb-2 z-10 title">You are registered as {Role[role].toString()}.</h1> : <></>}
          </div>

          {!sender && <Button
            onPress={() => { sender ? connectWallet() : newAccount() }} color={"primary"} className={`w-full ${isPending || !!connectError ? "bg-zinc-800" : ""}`} size="lg" disabled={isPending || isConnected || !!connectError}>
            {isPending || loading ? <Spinner color="default" size="md" /> :
              connectError !== null ? "Connection denied" :
                sender ?
                  "Sign in"
                  :
                  "Register"
            }
          </Button>}

          {sender && !role && <Button
            onPress={onOpen} color={"primary"} className={`w-full ${requestRoleLoading && "bg-zinc-800"}`} size="lg" disabled={isPending || !!connectError}>
            {requestRoleLoading ? <Spinner color="default" size="md" /> : "Request access"}
          </Button>}

          {sender && role ? <Button
            onPress={() => { router.push("/home"); }} color="primary" className="w-ful" size="lg">
            Continue
          </Button> : <></>}

          {sender && <Button
            onPress={newAccount} className={`w-full ${isPending ? "bg-zinc-800" : ""}`} color="primary" size="lg" disabled={isPending}>
            {isPending ? <Spinner color="default" size="md" /> : "New account"}
          </Button>}
        </div>
      </div>
    </main >
  );
}
