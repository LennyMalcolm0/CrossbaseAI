import Image from "next/image";
import { FaPlus } from "react-icons/fa";

type ConnectedCardProps = {
    logoUrl: string;
    logoAltText: string;
    description: string;
    stores: string[];
}
const ConnectedCard = ({
    logoUrl,
    logoAltText,
    description,
    stores
}: ConnectedCardProps) => {
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

export default ConnectedCard;