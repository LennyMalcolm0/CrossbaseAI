import Link from "next/link";
import Image from "next/image";
import StoreCard from "./integrations/StoreCard";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const Home = () => {
    return (  
        <main className="grow flex flex-col">
            <section className="p-5 rounded-[20px] border-2 border-dark-200">
                <div className="flex items-center justify-between mb-6">
                    <h1>Connect your online stores to get started</h1>
                    <AiOutlineCloseCircle className="text-3xl leading-[1] text-dark-100 hover:text-light-200 cursor-pointer" />
                </div>
                <div className="grid grid-cols-3 gap-[15px]">
                    <StoreCard 
                        logoUrl="/integrations/shopify-logo.svg"
                        logoAltText="Shopify"
                        description="Lorem ipsum dolor sit amet consectetur."
                    />
                    <StoreCard 
                        logoUrl="/integrations/amazon.svg"
                        logoAltText="Amazon"
                        description="Lorem ipsum dolor sit amet consectetur."
                        connected
                    />
                    <StoreCard 
                        logoUrl="/integrations/gumroad.svg"
                        logoAltText="Gumroad"
                        description="Lorem ipsum dolor sit amet consectetur."
                        connected
                    />
                </div>
                <Link 
                    href="/integrations" 
                    className="mt-3 text-xs text-light-400 hover:text-light-200 font-medium flex items-center gap-1"
                >
                    <span>See more options</span>
                    <FaArrowRight className="transition-01" />
                </Link>
            </section>
            <section className="grow w-full flex gap-5 my-5">
                <div className="w-full rounded-[20px] border-2 border-dark-200 flex flex-col">
                    <h1 className="pt-5 pl-5 text-white flex items-center gap-1.5">
                        <span>AI prompt</span>
                        <HiOutlineSparkles className="text-xl" />
                    </h1>
                    <div className="grow grid place-content-center text-center">
                        <Image 
                            src="/home/chart-breakout-square.svg"
                            alt=""
                            width={0} 
                            height={0} 
                            className="h-auto w-auto p-2 rounded-[8px] border border-light-400 mx-auto" 
                        />
                        <h3 className="text-light-300 text-sm pt-3 pb-2">No Store Found</h3>
                        <p className="text-light-400 text-xs">
                            Kindly connect your online store so <br /> you can run intelligent analysis.
                        </p>
                    </div>
                </div>
                <div className="w-full rounded-[20px] border-2 border-dark-200 flex flex-col">
                    <h1 className="pt-5 pl-5 text-white">Reports</h1>
                    <div className="grow grid place-content-center text-center">
                        <Image 
                            src="/home/star-06.svg"
                            alt=""
                            width={0} 
                            height={0} 
                            className="h-auto w-auto p-2 rounded-[8px] border border-light-400 mx-auto" 
                        />
                        <h3 className="text-light-300 text-sm pt-3 pb-2">Waiting for prompt</h3>
                        <p className="text-light-400 text-xs">
                            Enter the information you’d like to <br /> see from your online store.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
 
export default Home;