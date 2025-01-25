"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Tabs, Tab, Button, Spinner } from "@nextui-org/react";

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Web3
import { ArrowRightSquare, Plus } from "lucide-react";
import ActionBar from "@/components/bars/ActionBar";
import AccountList from "@/components/lists/AccountList";
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";
import AccountSearchBar from "@/components/bars/AccountSearchBar";
import PageTitle from "@/components/text/PageTitle";
import useRedirectWhenNotConnected from "@/hooks/useRedirectWhenNotConnected";
import { fetchAllUserRoles } from "@/services/role";
import { useEffect, useState } from "react";
import { User } from "@/types/users";
import { waitInSec } from "@/services/other";
import { useAccount, useWriteContract } from "@cometh/connect-react-hooks";
import { Address } from "viem";
import { woodTrackerContractAbi, woodTrackerContractAddress } from "@/environment/blockchain/contract";


// Features: 
// - Company caracteristics
// - Actuals users and their rights
// - Add new users
// - Update rights

export default function Company() {

    const { isConnected, address: sender } = useAccount();
    const { writeContract, isError, isSuccess, error, data } = useWriteContract();

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>();

    useRedirectOnLargeScreen();
    // useRedirectWhenNotConnected(isConnected);

    async function fetchUsers() {
        await waitInSec(1);

        try {
            const response = await fetchAllUserRoles(sender);
            setUsers(response);

            setLoading(false);
        } catch (error) {
            console.log(error);

            setLoading(false);
            router.push('/');
        }
    }

    /**
    * Assigns a role to a user on the blockchain.
    * @param sender The address of the sender (must be an Admin).
    * @param user The address of the user to whom the role is being assigned.
    * @param role The role to assign (as a number corresponding to the Role enum).
    */
    async function assignRole(user: Address | undefined, role: number): Promise<void> {
        console.log(`Assigning role ${role} to user ${user} by sender ${sender} at contract ${woodTrackerContractAddress}`);

        if (!sender)
            throw new Error("AssignRole Service - Error: No sender specified.");

        if (!user)
            throw new Error("AssignRole Service - Error: No user specified.");

        if (role <= 0)
            throw new Error("AssignRole Service - Error: Invalid role. Must be greater than 0.");

        try {
            const txHash = writeContract({
                address: woodTrackerContractAddress,
                abi: woodTrackerContractAbi,
                functionName: "assignRole",
                args: [user, role],
                account: sender
            });

            console.log("Transaction hash for assigning role: ", txHash);
        } catch (error) {
            console.log("Error assigning role: ", error);
            throw error;
        }
    }

    /**
 * Removes a user from the blockchain by resetting their role to None.
 * @param sender The address of the sender (must be an Admin).
 * @param user The address of the user to be removed.
 */
    async function removeUser(user: Address | undefined): Promise<void> {
        console.log(`Removing user ${user} by sender ${sender} at contract ${woodTrackerContractAddress}`);

        if (!sender)
            throw new Error("RemoveUser Service - Error: No sender specified.");

        if (!user)
            throw new Error("RemoveUser Service - Error: No user specified.");

        try {
            // Call the `removeUser` function on the contract
            const txHash = writeContract({
                address: woodTrackerContractAddress,
                abi: woodTrackerContractAbi,
                functionName: "removeUser",
                args: [user],
                account: sender
            });

            console.log("Transaction hash for removing user: ", txHash);
        } catch (error) {
            console.error("Error removing user: ", error);
            throw error;
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            {sender ?
                <main className="p-4 flex flex-col gap-4">
                    <PageTitle text="Company" />
                    <AccountSearchBar onAssignRole={assignRole} />
                    {loading ?
                        <Spinner color="default" />
                        :
                        users ? <AccountList users={users} onAssignRole={assignRole} onRemoveUser={removeUser} /> : "We're sorry, an error occurred while requesting user data."
                    }
                </main > :
                <Spinner color="default" />
            }
            <NavBar />
        </>
    );
}
