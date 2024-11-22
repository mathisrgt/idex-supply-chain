// React and NextJS
import Image from "next/image";

// UI
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to IDEX Supply Chain App</h1>
      <Link href="/dashboard"><Button>Start</Button></Link>
    </main>
  );
}
