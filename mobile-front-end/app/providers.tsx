"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
    children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return <NextUIProvider>
        {children}
    </NextUIProvider>
}