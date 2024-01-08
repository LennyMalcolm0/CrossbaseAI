/* eslint-disable @next/next/no-img-element */
"use client"
import { HiOutlineSparkles } from "react-icons/hi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { TbCloudDownload } from "react-icons/tb";
import { RiPushpin2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { useRef } from "react";
import { useClickAway } from "ahooks";

const Home = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaContainerRef = useRef<HTMLDivElement>(null);
 
    const handleInput = () => {
        const textarea = textareaRef.current;
        const parentDiv = textareaContainerRef.current;
        if (!textarea || !parentDiv) return;

        if (textarea.value.trim() === "") {
            parentDiv.style.height = "100px";
            return
        }
 
        // Adjust the height of the parent div according to the textarea's content
        if (textarea.scrollHeight > textarea.offsetHeight) {
            parentDiv.style.height = `${Math.min(textarea.scrollHeight + 50, 400)}px`;
        }
    };

    useClickAway(() => {
        const textarea = textareaRef.current;
        const parentDiv = textareaContainerRef.current;
        if (!textarea || !parentDiv) return;

        if (textarea.value.trim() === "") {
            parentDiv.style.height = "100px";
            return
        }
    }, [textareaContainerRef]);
    
    return (   
        <main className="h-full lg:py-5">
            <div className="h-full app-container-2 flex gap-5">
                <section className="max-lg:hidden w-[250px] h-full border-2 rounded-[20px] border-light-200 relative overflow-hidden">
                    <div className="absolute top-0 h-[110px] w-full primary-gradient" />
                    <div className="w-full px-5 py-6 h-full flex flex-col relative z-[9999]">
                        <h1 className="text-[18px] font-bold text-dark-200">History</h1>
                        <div className="grow grid place-content-center">
                            <div className="p-2 border border-dark-100 rounded-[8px] mx-auto">
                                <HiOutlineSparkles className="text-xl text-dark-100" />
                            </div>
                            <p className="text-center text-sm text-light-100 mt-5">No history to show</p>
                        </div>
                    </div>
                </section>
                <section className="grow lg:border-2 lg:rounded-[20px] lg:border-light-200 relative overflow-hidden">
                    <div className="sm:hidden absolute top-0 h-[110px] w-full primary-gradient" />
                    <div className="w-full h-full flex flex-col justify-between relative z-[9999]">
                        <div className="max-sm:px-5 lg:px-7 py-4 text-[18px] font-bold text-dark-200 flex items-center justify-between">
                            <h1 className="flex items-center gap-1.5">
                                <span className="max-w-[200px] line-clamp-1">Insights</span>
                                <HiOutlineSparkles />
                            </h1>
                            <div className="flex items-center gap-2.5 text-primary-400">
                                <div className="p-2 rounded-full border border-primary-400 hover:shadow-sm cursor-pointer">
                                    <TbCloudDownload className="text-[18px]" />
                                </div>
                                <div className="p-2 rounded-full border border-primary-400 hover:shadow-sm cursor-pointer">
                                    <RiPushpin2Line className="text-[18px]" />
                                </div>
                                <button className="px-3.5 py-2.5 rounded-full bg-primary-400 text-light-400
                                    text-sm font-bold flex items-center gap-2 hover:shadow-sm"
                                >
                                    <span>New Insight</span>
                                    <FaPlus className="text-[18px]" />
                                </button>
                            </div>
                        </div>
                        <section className="max-sm:px-5 lg:px-7 pt-8 overflow-y-auto">
                            <img 
                                src="/logo.svg"
                                alt="crossbase.ai icon"
                                className="h-10 w-auto mx-auto" 
                            />
                            <h2 className="text-dark-100 text-xl text-center font-medium mx-auto mt-[15px]">
                                Hello, John 👋🏻
                            </h2>
                            <p className="text-dark-400 text-sm text-center mt-1.5">
                                Here are some information Crossbase AI <br className="sm:hidden" /> can help you with.
                            </p>
                            <div className="w-full space-y-2.5 my-8">
                                {defaultPrompts.map((prompt, index) => (
                                    <div 
                                        key={index} 
                                        className="py-[13px] px-[15px] w-full rounded-[10px] bg-light-400 flex 
                                        items-center gap-[15px] cursor-pointer hover:shadow-sm"
                                    >
                                        <img 
                                            src={prompt.imageUrl}
                                            alt=""
                                            className="h-auto w-auto" 
                                        />
                                        <span className="text-sm text-dark-300">{prompt.prompt}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <form className="sticky bottom-0 max-sm:px-5 lg:px-7 py-5 w-full bg-light-300 text-sm text-dark-300">
                            <div 
                                ref={textareaContainerRef} 
                                className="h-[100px] w-full px-3.5 py-3 bg-light-400 rounded-[15px] border 
                                border-primary-100 shadow-[0px_0px_5px_4px_rgba(246,208,145,0.20)] flex gap-2.5"
                            >
                                <textarea 
                                    ref={textareaRef}
                                    name="prompt" 
                                    placeholder="Ask me anything about your store..."
                                    className="prompt w-full h-auto bg-transparent focus:outline-none resize-none"
                                    onInput={handleInput}
                                />
                                <button type="submit" className="text-2xl text-primary-400 mt-auto">
                                    <PiPaperPlaneRightFill />
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
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