import { UserStoresContext } from "@/app/context";
import useCustomSearchParams from "@/app/hooks/useCustomSearchParams";
import { Store, StoresByType } from "@/app/models";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useAsyncEffect, useLockFn } from "ahooks";
import { useContext, useEffect, useState } from "react";

function useConnectStore() {
    const { searchParams, updateSearchParams } = useCustomSearchParams();
    const type = searchParams.get("type");
    const storeDomain = searchParams.get("shop");
    const [createdStore, setCreatedStore] = useState<Store>();
    const [creatingStore, setCreatingStore] = useState(false);

    useAsyncEffect(useLockFn(async () => {
        if (!storeDomain || !type) return;
        setCreatingStore(true);

        const { data, error } = await HttpClient.post<Store>("/stores", {
            url: storeDomain,
            type
        });

        if (error || !data) {
            setCreatingStore(false);
            alert((error as any).message || "Failed to create store. Reload page to try again.");
            return
        }

        setCreatedStore(data);
        setCreatingStore(false);
        updateSearchParams({});
    }), [searchParams])

    return { createdStore, creatingStore }
}

function formatStoresByType(stores: Store[]): StoresByType[] {
    const storesByType: StoresByType[] = [];

    for (const store of stores) {
        const index = storesByType.findIndex(
            group => group.type === store.type
        );

        if (index !== -1) {
            // If the group already exists, add the store to it
            storesByType[index].stores.push(store);
        } else {
            // If the group doesn't exist, create a group with the new store
            const newGroup: StoresByType = {
                id: `${Math.random()}-${Math.random()}`,
                type: store.type,
                stores: [store]
            };
            storesByType.push(newGroup);
        }
    }

    return storesByType;
}

function useManageIntegrations() {
    const { 
        connectedStores, 
        loadingConnectedStores,
        fetchConnectedStores
    } = useContext(UserStoresContext);
    const { createdStore, creatingStore } = useConnectStore();
    const [connectedStoresByType, setStoresByType] = useState<StoresByType[]>([]);

    useEffect(() => {
        if (connectedStores.length) {
            setStoresByType(formatStoresByType(connectedStores));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingConnectedStores]);

    useEffect(() => {
        if (createdStore) {
            fetchConnectedStores();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdStore]);

    return { 
        connectedStoresByType, 
        loadingConnectedStores, 
        creatingStore, 
        createdStore,
    };
}

export default useManageIntegrations;