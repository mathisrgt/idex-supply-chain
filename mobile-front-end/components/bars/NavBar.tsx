import Link from "next/link";
import { Home, User, LayoutGrid, Factory } from 'lucide-react';
import { Badge } from "@nextui-org/react";

export default function BottomNavBar() {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 py-2 flex justify-around z-50">
            <Link href="/home" className="flex flex-col items-center">
                <Home className="text-gray-600" />
                <span className="text-xs text-gray-600">Home</span>
            </Link>
            <Badge content="1" color="danger" className="flex flex-col">
                <Link href="/dashboard" className="flex flex-col items-center">
                    <LayoutGrid className="text-gray-600" />
                    <span className="text-xs text-gray-600">Dashboard</span>
                </Link>
            </Badge>
            <Badge content="1" color="danger" className="flex flex-col">
                <Link href="/company" className="flex flex-col items-center">
                    <Factory className="text-gray-600" />
                    <span className="text-xs text-gray-600">Company</span>
                </Link>
            </Badge>
            <Badge content="2" color="danger" className="flex flex-col">
                <Link href="/account" className="flex flex-col items-center">
                    <User className="text-gray-600" />
                    <span className="text-xs text-gray-600">Profile</span>
                </Link>
            </Badge>
        </nav>
    );
}
