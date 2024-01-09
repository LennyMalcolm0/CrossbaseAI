// "use client"
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

type DisconnectedCardProps = {
    logoUrl: string;
    logoAltText: string;
    description: string;
    connected?: boolean;
    comingSoon?: boolean;
}
export function DisconnectedCard ({
    logoUrl,
    logoAltText,
    description,
    connected,
    comingSoon,
}: DisconnectedCardProps) {
    return (
        <>
        {!comingSoon ? (
            <div className="p-5 rounded-[20px] bg-light-400 flex flex-col gap-4 justify-between border border-light-200">
                <Image 
                    src={logoUrl}
                    alt={logoAltText}
                    width={0} 
                    height={0} 
                    className="h-[17px] w-auto mr-auto" 
                />
                <p className="text-xs text-light-100">{description}</p>
                <button className="w-full py-[13px] bg-primary-100 text-sm font-bold 
                    text-dark-100 hover:bg-primary-400 hover:text-light-400"
                > Connect
                </button>
            </div>
        ):(
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
        </>
    );
}

type ConnectedCardProps = {
    logoUrl: string;
    logoAltText: string;
    description: string;
    stores: string[];
}
export function ConnectedCard ({
    logoUrl,
    logoAltText,
    description,
    stores
}: ConnectedCardProps) {
    return (
        <div className="w-full h-[] p-5 rounded-[20px] bg-light-400 flex flex-col justify-between border border-light-200">
            <div className="flex items-center justify-between text-light-200">
                <Image 
                    src={logoUrl}
                    alt={logoAltText}
                    width={0} 
                    height={0} 
                    className="h-[17px] w-auto" 
                />
                <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary-300" />
                    <span className="text-sm font-medium text-primary-300">Connected</span>
                </div>
            </div>
            <p className="text-xs text-light-100 my-5">{description}</p>
            <div className="flex flex-wrap items-center gap-3 mb-[15px]">
                {stores.map((store) => (
                    <div key={store} className="w-fit py-2 px-[15px] text-center rounded-[50px] 
                        border border-dark-100 text-sm font-dedium text-dark-100"
                    >  
                        {store}
                    </div>
                ))}
            </div>
            <button className="flex items-center gap-1 text-xs font-bold text-primary-400">
                <span>Add Shopify Store</span>
                <FaPlus />
            </button>
        </div>
    );
}
