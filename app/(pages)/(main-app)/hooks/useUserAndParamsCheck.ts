import { StoreType } from "@/app/models";
import { getCurrentUser } from "@/app/utils/auth";
import { useAsyncEffect } from "ahooks";
import { useRouter, useSearchParams } from "next/navigation";
import useActiveStore from "./useActiveStore";

function useUserAndParamsCheck() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const storeDomain = searchParams.get("shop");
    const newStore = searchParams.get("new");
    const { setDefaultStore } = useActiveStore();

    useAsyncEffect(async () => {
        const user = await getCurrentUser();

        if (!storeDomain || !type) {
            // if (!user) router.push(`/sign-in`);
            return
        };

        setDefaultStore({ type: type as StoreType, url: storeDomain });

        const storeState = newStore ? "new-store" : "existing-store";
        const userState = user ? "valid-user" : "invalid-user";
        const condition = `${storeState}_${userState}`;

        switch (condition) {
            case "new-store_valid-user":
                router.push(`/integrations?shop=${storeDomain}&type=${type}`);
                break;
            case "new-store_invalid-user":
                router.push(`/sign-in?shop=${storeDomain}&type=${type}&new=${newStore}`);
                break;
            case "existing-store_valid-user":
                break;
            case "existing-store_invalid-user":
                // router.push(`/sign-in`);
                break;
            default:
                break;
        }
    }, [searchParams])
}

export default useUserAndParamsCheck;