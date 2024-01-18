"use client"
import { Store, StoreType } from "@/app/models";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useClickAway, useRequest, useToggle } from "ahooks";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import useActiveStore from "../hooks/useActiveStore";

const storesArray: Store[] = Array.from({ length: 10 }, (_, index) => ({
    id: `store-${index + 1}`,
    type: StoreType.SHOPIFY, // Assuming you want all stores to be of type SHOPIFY
    url: `https://store${index + 1}.example.com`,
    updatedAt: new Date().toISOString(),
}));

const SelectStore = () => {
    const { 
        store: activeStore, 
        defaultStore, 
        setStore: setActiveStore,
        setDefaultStore
    } = useActiveStore();
    const [connectedStores, setConnectedStores] = useState<Store[]>(storesArray);

    useEffect(() => {
        if (connectedStores.length > 1) {
            const store = connectedStores.find(store => store.url === defaultStore.url)
            if (store) setActiveStore(store);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connectedStores, defaultStore])

    const { loading: loadingConnectedStores } = useRequest(
        () => HttpClient.get<Store[]>(`/stores`),
        { 
            onSuccess: ({ data }) => {
                if (data) setConnectedStores(data);
            },
            cacheKey: "userStores" 
        }
    );
    
    const storeMenuRef = useRef<HTMLDivElement>(null);
    const storeMenuButtonRef = useRef<HTMLDivElement>(null);
    const [storeMenuOpened, { toggle }] = useToggle(false);

    useClickAway(() => {
        storeMenuOpened && toggle();
    }, [storeMenuRef, storeMenuButtonRef]);

    const handleStoreClick = (store: Store) => {
        setActiveStore(store);
        setDefaultStore({ type: store.type, url: store.url });
        toggle();
    };

    return (
        <div className="relative">
            <div 
                ref={storeMenuButtonRef}
                onClick={toggle}
                className="h-[34px] pl-[15px] pr-2.5 bg-light-300 rounded-full text-dark-100 
                flex items-center justify-center gap-1.5 text-sm cursor-pointer header-element"
            >
                {(activeStore || defaultStore) ? (<>
                    <FaShopify className="text-[#5E8E3E]" />
                    <span className="font-medium max-w-[180px] max-sm:max-w-[120px] ellipses">
                        {activeStore.url || defaultStore.url}
                    </span>
                </>):(
                    <span>Select Store</span>
                )}
                <FaChevronDown className={`${storeMenuOpened && "rotate-[180deg]"}`} />
            </div>

            {storeMenuOpened && (
                <div 
                    ref={storeMenuRef}
                    className="absolute right-0 max-sm:translate-x-[40px] top-[45px] w-[300px] sm:w-[350px] max-h-[320px] py-1 bg-white rounded-[15px] border-[1.5px] 
                    border-light-200 overflow-x-hidden overflow-y-auto z-[9999999] shadow-[0_0_30px_0_rgba(0,0,0,0.15)]"
                >
                    {connectedStores.map((store, index) => (
                        <button 
                            key={store.id} 
                            className={`w-full flat px-4 py-2.5 flex items-center gap-2 hover:bg-light-200 
                                ${index !== connectedStores.length - 1 && "border-b border-light-200"}
                                ${store.id === activeStore.id && "bg-light-200"} text-start
                            `}
                            onClick={() => handleStoreClick(store)}
                        >
                            <FaShopify className="text-[#5E8E3E]" />
                            <span className="w-full font-medium ellipses">{store.url}</span>
                        </button> 
                    ))}
                </div>
            )}
        </div>
    );
}
 
export default SelectStore;