"use client";

import { Button } from "@nextui-org/react";
import { Redo2, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotSupported() {
    const router = useRouter();

    return (
        <>
            <main className="p-4 flex flex-col gap-6 justify-center min-h-screen items-center">
                <Smartphone size={40} />
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-xl">Sorry, this device is not supported.</h1>
                    <p className="text-sm text-slate-600">WoodTracker is only available on smartphone.</p>
                </div>
                <Button color="primary" onClick={() => {
                    router.back();
                }}>
                    <Redo2 />
                    Try again
                </Button>
            </main>
        </>
    );
}
