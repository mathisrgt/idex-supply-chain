import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@cometh/connect-react-hooks";
import { waitInSec } from "@/services/other";

function useRedirectWhenNotConnected(isConnected: boolean) {
    const router = useRouter();

    async function checkConnection() {
        await waitInSec(2);
        if (!isConnected) router.push("/");
    }

    useEffect(() => {
        checkConnection();
    }, []);
};

export default useRedirectWhenNotConnected;
