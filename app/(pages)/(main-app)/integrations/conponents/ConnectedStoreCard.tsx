"use client"
import { Store, StoreType } from "@/app/models";
import { useToggle } from "ahooks";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import ConnectStore from "./ConnectStore";

type ConnectedStoreCardProps = {
    type: StoreType;
    stores: Store[];
}
const ConnectedStoreCard = ({ type, stores }: ConnectedStoreCardProps) => {
    const [displayConnectStorePopup, { toggle }] = useToggle(false);

    return (<>
        <div className="w-full h-[] p-5 rounded-[20px] bg-light-400 flex flex-col justify-between border border-light-200">
            <div className="flex items-center justify-between text-light-200">
                <Image 
                    src={"/integrations/shopify.svg"}
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
            <p className="text-xs text-light-100 my-5 capitalize">My {type.toLowerCase()} Store(s)</p>
            <div className="flex flex-wrap items-center gap-3 mb-[15px]">
                {stores
                .sort((a, b) => new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf())
                .map((store) => (
                    <button key={store.id} className="w-fit py-2 px-[15px] text-center rounded-[50px] 
                        border border-dark-100 text-sm font-dedium text-dark-100 hover:bg-primary-100"
                    >  
                        {store.url}
                    </button>
                ))}
            </div>
            <button 
                onClick={toggle}
                className="flex items-center gap-1 text-xs font-bold text-primary-400 capitalize"
            >
                <span>Add {type.toLowerCase()} Store</span>
                <FaPlus />
            </button>
        </div>

        {displayConnectStorePopup && (
            <ConnectStore closePopup={toggle} />
        )}
    </>);
}

export default ConnectedStoreCard;