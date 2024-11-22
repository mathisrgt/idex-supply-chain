// React and NextJS
import Image from "next/image";

// UI
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Dashboard() {
    return (
        <main>
            <h1>Welcome to IDEX Supply Chain App</h1>
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md">NextUI</p>
                        <p className="text-small text-default-500">nextui.org</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>Make beautiful websites regardless of your design experience.</p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Link showAnchorIcon>
                        Visit source code on GitHub.
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
