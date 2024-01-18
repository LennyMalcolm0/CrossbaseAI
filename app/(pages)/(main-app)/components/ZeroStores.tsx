import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { RiShareBoxLine } from "react-icons/ri";

const ZeroStores = () => {
    return (
        <div className="w-full max-w-[750px] px-5 mx-auto max-lg:py-5">
            <h1 className="text-xl sm:text-2xl font-bold">Let’s Get Started 👋🏻</h1>
            <div className="w-full py-[25px] px-5 sm:px-[25px] my-5 rounded-[20px] 
                bg-[linear-gradient(88deg,_#000_0%,_#8E5901_100%)] relative"
            >
                <div className="max-sm:max-w-[65%]">
                    <p className="max-sm:text-sm text-light-300 font-bold sm:font-medium mb-5 sm:mb-4">
                        Connect your online store and get intelligent <br className="max-md:hidden" />
                        insights on sales, inventory & customer orders.
                    </p>
                    <Link href="/integrations" className="w-fit flex items-center gap-1 text-sm font-medium text-primary-100">
                        <span>See more</span>
                        <LuArrowRight className="text-sm" />
                    </Link>
                </div>
                <Image 
                    src="/home/woman.lg.png"
                    alt="Shopping" 
                    width={150} 
                    height={152} 
                    className="h-[140px] sm:h-[150px] w-auto absolute right-0 bottom-0" 
                />
            </div>
            <div className="w-full p-5 rounded-[20px] border border-light-200 bg-light-400">
                <div className="w-full flex items-center justify-between">
                    <Image 
                        src={"/integrations/shopify.svg"}
                        alt={"Shopify"}
                        width={0} 
                        height={0} 
                        className="h-6 w-auto" 
                    />
                    <Link href="/" className="w-fit flex items-center gap-1.5 text-sm font-bold text-primary-400">
                        <span>Install in Shopify</span>
                        <RiShareBoxLine className="text-[18px]" />
                    </Link>
                </div>
                <p className="text-sm my-5">
                    Watch the video below to see how to install 
                    <span className="text-primary-400"> Crossbase </span> 
                    directly in your Shopify store.
                </p>
                <div className="h-[280px] w-full rounded-[10px] border border-dark-400 bg-dark-100 bg-opacity-70"></div>
            </div>
        </div>
    );
}
 
export default ZeroStores;