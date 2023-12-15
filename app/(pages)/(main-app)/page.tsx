"use client"
import Link from "next/link";
import Image from "next/image";
import StoreCard from "./components/StoreCard";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const Home = () => {
    return (  
        <main className="grow flex flex-col pb-5">
            <section className="p-5 hidden max-sm:p-4 rounded-[20px] border-2 border-dark-200 relative mb-5">
                <AiOutlineCloseCircle 
                    className="sm:hidden text-3xl leading-[1] text-dark-100 
                    hover:text-light-200 cursor-pointer absolute right-3 top-3" 
                />
                <div className="flex items-center justify-between mb-6 max-sm:whitespace-nowrap">
                    <h1>Connect your online stores to get started</h1>
                    <AiOutlineCloseCircle 
                        className="max-sm:hidden text-3xl leading-[1] text-dark-100 
                        hover:text-light-200 cursor-pointer" 
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[15px]">
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
            <section className="grow w-full flex gap-5">
                <div className="w-full rounded-[20px] border-2 border-dark-200 flex flex-col">
                    <h1 className="pt-5 pl-5 text-white flex items-center gap-1.5">
                        <span>AI prompt</span>
                        <HiOutlineSparkles className="text-xl" />
                    </h1>
                    <div className="grow flex flex-col mt-5 px-5 pb-5 border-t border-dark-200">
                        <section className="grow pt-[100px]">
                            <Image 
                                src="/crossbase-icon.svg"
                                alt="crossbase icon"
                                width={0} 
                                height={0} 
                                className="h-auto w-auto mx-auto" 
                                quality={100}
                            />
                            <h2 className="text-light-100 text-base text-center font-medium mx-auto mt-[15px]">Hello, John 👋🏻</h2>
                            <p className="text-light-400 text-xs text-center mt-1.5">
                                Here are some information Crossbase AI can help you with.
                            </p>
                            <div className="w-full space-y-2.5 mt-10">
                                {defaultPrompts.map((prompt, index) => (
                                    <div key={index} className="py-[15px] px-[15px] rounded-[10px] bg-dark-300 flex items-center gap-[15px]">
                                        <Image 
                                            src={prompt.imageUrl}
                                            alt=""
                                            width={0} 
                                            height={0} 
                                            className="h-auto w-auto" 
                                            quality={100}
                                        />
                                        <span className="text-sm text-light-300">{prompt.prompt}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="relative">
                            <textarea 
                                name="" 
                                className="w-full bg-transparent rounded-[10px] border border-dark-100" 
                            />
                        </section>
                    </div>
                    <div className="grow hidden place-content-center text-center">
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

const defaultPrompts = [
    {
        imageUrl: "/home/file-05.svg",
        prompt: "How much sales did I make in the past 3 days and which product sold the most within the same period?",
    },
    {
        imageUrl: "/home/bar-line-chart.svg",
        prompt: "Show me my top 10 fulfilled orders by countries.",
    },
    {
        imageUrl: "/home/line-chart-up.svg",
        prompt: "Considering my current sales growth rate, how much can I make in the next six months? Don’t include my Amazon FBA sales.",
    },
]