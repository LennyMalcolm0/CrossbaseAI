// "use client"
import { useToggle } from "ahooks";
import Image from "next/image";
import ConnectStore from "./ConnectStore";
import useCustomSearchParams from "@/app/hooks/useCustomSearchParams";
import { StoreType } from "@/app/models";

type DisconnectedStoreCardProps = {
    type: StoreType;
    logoUrl: string;
    logoAltText: string;
    description: string;
    connected?: boolean;
    comingSoon?: boolean;
}
const DisconnectedStoreCard = ({
    type,
    logoUrl,
    logoAltText,
    description,
    connected,
    comingSoon,
}: DisconnectedStoreCardProps) => {
    const [displayConnectStorePopup, { toggle }] = useToggle(false);
    const { updateSearchParams } = useCustomSearchParams();

    return (<>
        {!comingSoon ? (<>
            <div className="p-5 rounded-[20px] bg-light-400 flex flex-col gap-4 justify-between border border-light-200">
                <Image 
                    src={logoUrl}
                    alt={logoAltText}
                    width={0} 
                    height={0} 
                    className="h-[17px] w-auto mr-auto" 
                />
                <p className="text-xs text-light-100">{description}</p>
                <button 
                    // onClick={toggle}
                    onClick={() => updateSearchParams({ type, shop: "true" })}
                    className="w-full py-[13px] bg-primary-100 text-sm font-bold 
                        text-dark-100 hover:bg-primary-400 hover:text-light-400"
                > 
                    Connect
                </button>
            </div>

            {displayConnectStorePopup && (
                <ConnectStore closePopup={toggle} />
            )}
        </>):(
            <div className="p-5 rounded-[20px] border border-light-100 flex flex-col gap-4 justify-between select-none">
                <div className="flex items-center justify-between text-light-200">
                    <Image 
                        src={logoUrl}
                        alt={logoAltText}
                        width={0} 
                        height={0} 
                        className="h-[17px] w-auto" 
                    />
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-[#309BBD]" />
                        <span className="text-sm font-medium text-[#309BBD]">N/A</span>
                    </div>
                </div>
                <p className="text-xs text-light-100">{description}</p>
                <div className="w-full py-[13px] text-center rounded-[40px] border 
                    border-dark-400 text-sm font-bold text-dark-400"
                >
                    Coming Soon
                </div>
            </div>
        )}
    </>);
}

export default DisconnectedStoreCard;