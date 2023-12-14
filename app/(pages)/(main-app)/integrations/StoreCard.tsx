// "use client"
import Image from "next/image";

type StoreCardProps = {
    logoUrl: string;
    logoAltText: string;
    description: string;
    connected?: boolean;
    comingSoon?: boolean;
}
const StoreCard = ({
    logoUrl,
    logoAltText,
    description,
    connected,
    comingSoon,
}: StoreCardProps) => {
    return (
        <>
        {!comingSoon ? (
            <div className="p-5 rounded-[20px] bg-dark-300 flex flex-col gap-4 justify-between">
                <div className="flex items-center justify-between text-light-200">
                    <Image 
                        src={logoUrl}
                        alt={logoAltText}
                        width={0} 
                        height={0} 
                        className="h-auto w-auto" 
                    />
                    {connected && (
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary-300" />
                            <span className="text-[10px] text-primary-300">Connected</span>
                        </div>
                    )}
                </div>
                <p className="text-xs text-light-400">{description}</p>
                <button className={`${connected ? "text-primary-200" : "text-primary-100"}
                    w-full py-4 bg-dark-400 font-bold hover:bg-light-100
                `}>
                    {connected ? "Disconnect" : "Connect"}
                </button>
            </div>
        ):(
            <div className="p-5 rounded-[20px] border border-dark-100 flex flex-col gap-4 justify-between">
                <Image 
                    src={logoUrl}
                    alt={logoAltText}
                    width={0} 
                    height={0} 
                    className="h-auto w-auto" 
                />
                <p className="text-xs text-light-400">{description}</p>
                <button className="w-full py-4 bg-dark-400 border border-dark-100 font-bold text-light-400">
                    Coming Soon
                </button>
            </div>
        )}
        </>
    );
}
 
export default StoreCard;