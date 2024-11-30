import { useEffect } from "react";
import { useRouter } from "next/navigation";

function useRedirectOnLargeScreen() {
    const router = useRouter();

    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth > 768) {
                router.push("/not-supported");
            }
        };

        if (typeof window !== "undefined") {
            checkScreenSize();
            window.addEventListener("resize", checkScreenSize);
        }

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);
};

export default useRedirectOnLargeScreen;
