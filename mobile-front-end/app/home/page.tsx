"use client";

// React and NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// UI
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

// UX (Components)
import NavBar from "@/components/bars/NavBar";

// Wagmi
import { useAccount, useDisconnect } from 'wagmi'
import { Plus } from "lucide-react";
import { HomeChart } from "@/components/charts/homeChart";
import { useEffect } from "react";
import useRedirectOnLargeScreen from "@/hooks/useRedirectOnLargeScreen";
import TransactionPreviewList from "@/components/lists/TransactionPreviewList";
import PageTitle, { PageSecondaryTitle } from "@/components/text/PageTitle";

export default function Home() {
    useRedirectOnLargeScreen();

    const router = useRouter();

    const { address, isConnected } = useAccount();

    useEffect(() => {
        // if (!isConnected) {
        //     router.push('/');
        // }
    }, []);

    return (
        <>
            <main className="p-4 flex flex-col gap-4">
                <PageTitle text="Home" />
                <Carousel className="flex flex-col w-full gap-2">
                    <PageSecondaryTitle text="Activity" />
                    <CarouselContent>
                        <CarouselItem>
                            <HomeChart />
                        </CarouselItem>
                        <CarouselItem>
                            <HomeChart />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
                <TransactionPreviewList />
            </main>
            <NavBar />
        </>
    );
}
