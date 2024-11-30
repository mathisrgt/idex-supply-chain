"use client";

import { Smartphone } from "lucide-react";

export default function NotSupported() {
    return (
        <>
            <main className="p-4 flex flex-col gap-4 justify-center min-h-screen items-center">
                <Smartphone size={40} />
                <h1 className="text-xl">Sorry, this device is not supported.</h1>
                <p className="text-body">WoodTracker is only available on smartphone.</p>
            </main>
        </>
    );
}
