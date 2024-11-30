import Link from "next/link";
import { Home, User, MessageCircle, HandCoins } from 'lucide-react';
import { Badge } from "@nextui-org/react";

export default function FlowCreationForm() {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 py-2 flex justify-around z-50">
            <Link href="/match" className="flex flex-col items-center">
                <Home className="text-gray-600" />
                <span className="text-xs text-gray-600">Home</span>
            </Link>
            <Badge content="1" color="danger" className="flex flex-col">
                <Link href="/all-chats" className="flex flex-col items-center">
                    <MessageCircle className="text-gray-600" />
                    <span className="text-xs text-gray-600">Chat</span>
                </Link>
            </Badge>
            <Badge content="!" color="danger" className="flex flex-col">
                <Link href="/reward" className="flex flex-col items-center">
                    <HandCoins className="text-gray-600" />
                    <span className="text-xs text-gray-600">Reward</span>
                </Link>
            </Badge>
            <Link href="/account" className="flex flex-col items-center">
                <User className="text-gray-600" />
                <span className="text-xs text-gray-600">Profile</span>
            </Link>
        </nav>
    );
}
