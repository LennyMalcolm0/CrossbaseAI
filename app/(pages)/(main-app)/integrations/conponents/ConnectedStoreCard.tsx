"use client"
import { Store, StoreType } from "@/app/models";
import { useToggle } from "ahooks";
import Image from "next/image";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import ConnectStore from "./ConnectStore";
import useCustomSearchParams from "@/app/hooks/useCustomSearchParams";
import { SlClose } from "react-icons/sl";
import { useState } from "react";
import { HttpClient } from "@/app/utils/axiosRequests";

type ConnectedStoreCardProps = {
    type: StoreType;
    stores: Store[];
    fetchConnectedStores: () => void;
}
const ConnectedStoreCard = ({ type, stores, fetchConnectedStores }: ConnectedStoreCardProps) => {
    const [displayConnectStorePopup, { toggle: toggleConnectStorePopup }] = useToggle(false);
    const [displayDeleteStorePopup, { toggle: toggleDeleteStorePopup }] = useToggle(false);
    const [deleteStore, setDeleteStore] = useState<Store | null>(null);
    const [deletingStore, setDeletingStore] = useState(false);
    const { updateSearchParams } = useCustomSearchParams();

    const handleDeleteStore = async () => {
        setDeletingStore(true);
        await HttpClient.delete(`/stores/${deleteStore?.id}`);
        toggleDeleteStorePopup();
        fetchConnectedStores();
        setDeletingStore(false);
    }

    return (<>
        <div className="w-full h-[] p-5 rounded-[20px] bg-light-400 flex flex-col justify-between border border-light-200">
            <div className="flex items-center justify-between text-light-200">
                <Image 
                    src={`/integrations/${type.toLowerCase()}.svg`}
                    alt={type.toLowerCase()}
                    width={0} 
                    height={0} 
                    className="h-[17px] w-auto" 
                />
                <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary-300" />
                    <span className="text-sm font-medium text-primary-300">Connected</span>
                </div>
            </div>
            <p className="text-xs text-light-100 my-5">
                My <span className="capitaliza"> {type.toLowerCase()} </span> Store(s)
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-[15px]">
                {stores
                .sort((a, b) => new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf())
                .map((store) => (
                    <div 
                        key={store.id} 
                        className="w-fit py-2 px-[15px] text-center rounded-[50px] border border-dark-100 flex items-center gap-2
                        text-sm font-dedium text-dark-100 hover:bg-primary-400 hover:text-light-400"
                    >  
                        <span>{store.url}</span>
                        <FaRegTrashAlt
                            onClick={() => {
                                setDeleteStore(store);
                                toggleDeleteStorePopup();
                            }}
                            className="hover:scale-[1.2] cursor-pointer" 
                        />
                    </div>
                ))}
            </div>
            <button 
                // onClick={toggle}
                onClick={() => updateSearchParams({ type, shop: "true" })}
                className="flex items-center gap-1 text-xs font-bold text-primary-400 capitalize"
            >
                <span>Add {type.toLowerCase()} Store</span>
                <FaPlus />
            </button>
        </div>

        {displayConnectStorePopup && (
            <ConnectStore closePopup={toggleConnectStorePopup} />
        )}

        {displayDeleteStorePopup && (
            <div className="fixed inset-0 h-[100svh] w-screen bg-dark-100 bg-opacity-70 grid place-content-center z-[99999999]">
                <div className="w-[400px] max-w-[92vw] mx-auto flex flex-col p-5 rounded-[20px] bg-light-400 border border-light-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[18px] font-bold text-dark-100">
                            Delete Store ({deleteStore?.url})
                        </h3>
                        <SlClose
                            onClick={toggleDeleteStorePopup} 
                            className="text-[30px] leading-[1] text-dark-100 hover:scale-[1.1] cursor-pointer" 
                        />
                    </div>
                    <p className="text-sm my-[30px] text-dark-400">
                        You’re about to delete this store. Do you want to proceed?
                    </p>
                    <button 
                        onClick={handleDeleteStore} 
                        disabled={deletingStore}
                        className="w-full py-4 px-[18px] bg-primary-100 text-sm text-dark-100 hover:bg-primary-400 
                        hover:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] font-bold"
                    >
                        {deletingStore ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        )}
    </>);
}

export default ConnectedStoreCard;