import { Store, StoreType } from "@/app/models";
import { getCurrentUser } from "@/app/utils/auth";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useAsyncEffect, useRequest } from "ahooks";
import { sendEmailVerification } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import useActiveStore from "./useActiveStore";

export default function useManageAppLayout() {
    const router = useRouter();
    const pathname = usePathname();
    // TODO ? Use session storage instead
    const [unverifiedEmail, setUnverifiedEmail] = useState(false);
    const [connectedStores, setConnectedStores] = useState<Store[]>([]);
    const { store: activeStore,  setStore: setActiveStore } = useActiveStore();
    
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
                if (!activeStore?.id && data?.length) {
                    setActiveStore(data[0]);
                } 
                if (!data?.length) {
                    router.push("/integrations");
                } 
            },
            cacheKey: "userStores",
            // staleTime: -1,
            // cacheTime: -1
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