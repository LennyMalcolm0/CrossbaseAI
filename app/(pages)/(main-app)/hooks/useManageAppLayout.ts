import { Store, StoreType } from "@/app/models";
import { getCurrentUser } from "@/app/utils/auth";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useAsyncEffect, useRequest } from "ahooks";
import { sendEmailVerification } from "firebase/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

const storesArray: Store[] = Array.from({ length: 10 }, (_, index) => ({
    id: `store-${index + 1}`,
    type: StoreType.SHOPIFY, // Assuming you want all stores to be of type SHOPIFY
    url: `https://store${index + 1}.example.com`,
    updatedAt: new Date().toISOString(),
}));

export default function useManageAppLayout() {
    const router = useRouter();
    const pathname = usePathname();
    // TODO ? Use session storage instead
    const [unverifiedEmail, setUnverifiedEmail] = useState(false);
    const [connectedStores, setConnectedStores] = useState<Store[]>(storesArray);
    
    const checkPath = (path: string) => pathname === path;

    useAsyncEffect(async () => {
        const user = await getCurrentUser();

        if (user && !user.emailVerified) {
            setUnverifiedEmail(true);
            await sendEmailVerification(user);
            return
        }

        if (pathname !== "/" && !user) {
            router.push("/sign-in");
        }
    }, [])

    const { run: fetchConnectedStores, loading: loadingConnectedStores,  } = useRequest(
        () => HttpClient.get<Store[]>(`/stores`),
        { 
            onSuccess: ({ data }) => {
                if (data) setConnectedStores(data);
            },
            cacheKey: "userStores",
            staleTime: -1,
            cacheTime: -1
        }
    );

    return {
        unverifiedEmail,
        connectedStores,
        loadingConnectedStores,
        checkPath,
        fetchConnectedStores
    }
}