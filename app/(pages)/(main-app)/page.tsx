/* eslint-disable @next/next/no-img-element */
"use client"
import { HiOutlineSparkles } from "react-icons/hi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { TbCloudDownload } from "react-icons/tb";
import { RiPushpin2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { useContext, useRef } from "react";
import InsightHistory from "./components/InsightHistory";
import useManageInsight from "./hooks/useManageInsight";
import useUserAndParamsCheck from "./hooks/useUserAndParamsCheck";
import ZeroStores from "./components/ZeroStores";
import { UserStoresContext } from "@/app/context";

const Home = () => {
    useUserAndParamsCheck();
    const { 
        connectedStores, 
        loadingConnectedStores 
    } = useContext(UserStoresContext);
    const {
        insightsBoxRef,
        conversation,
        activeInsight,
        textareaValue,
        loadingInsight,
        awaitingResponse,
        setTextareaValue,
        streamResponse,
        createNewInsight
    } = useManageInsight();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
 
    const handleInput = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';

        const minimumHeight = Math.max(textarea.scrollHeight, 76);
        const newHeight = Math.min(minimumHeight, 300);

        textarea.style.height = `${newHeight}px`;
    };
    
    return (  
        <main className="h-full lg:py-5">
            {loadingConnectedStores ? (
                <h1>Loading app...</h1>
            ):(<>
                {(connectedStores.length > 0) ? (
                    <div className="h-full app-container-2 flex gap-5">
                        <InsightHistory />

                        <section className="conversation-box lg:border-2 lg:rounded-[20px] lg:border-light-200 relative overflow-hidden">
                            <div className="sm:hid den absolute top-0 h-[110px] w-full primary-gradient" />
                            <div className="w-full h-full flex flex-col justify-between relative z-[9999]">
                                <div className="max-sm:px-5 lg:px-7 py-4 text-[18px] font-bold text-dark-200 flex items-center justify-between">
                                    <h1 className="flex items-center gap-1.5">
                                        <span className="max-w-[200px] line-clamp-1">{activeInsight?.title || "Insights"}</span>
                                        <HiOutlineSparkles />
                                    </h1>
                                    <div className="flex items-center gap-2.5 text-primary-400">
                                        <div className="max-sm:hidden p-2 rounded-full border border-primary-400 hover:shadow-sm cursor-pointer">
                                            <TbCloudDownload className="text-[18px]" />
                                        </div>
                                        <div className="max-sm:hidden p-2 rounded-full border border-primary-400 hover:shadow-sm cursor-pointer">
                                            <RiPushpin2Line className="text-[18px]" />
                                        </div>
                                        <button 
                                            onClick={createNewInsight}
                                            className="px-3.5 py-2.5 rounded-full bg-primary-400 text-light-400
                                            text-sm font-bold flex items-center gap-2 hover:shadow-sm"
                                        >
                                            <span>New Insight</span>
                                            <FaPlus className="text-[18px]" />
                                        </button>
                                    </div>
                                </div>
                                <section ref={insightsBoxRef} className="max-sm:px-5 lg:px-7 pt-8 overflow-y-auto">
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
                                    <div className="w-full space-y-2.5 mt-8 mb-[100px]">
                                        {defaultPrompts.map((prompt, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => {
                                                    setTextareaValue(prompt.prompt);
                                                    // setTimeout(() => streamResponse(null), 200);
                                                }}
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
                                    {conversation?.map((message, index) => (
                                        <div 
                                            key={index} 
                                            className="w-full flex gap-3"
                                        >
                                            {message.role === "assistant" && (
                                                <img 
                                                    src="/home/assistant.png" 
                                                    alt="AI" 
                                                    className="rounded-full h-[28px] w-[28px] object-cover" 
                                                />
                                            )}
                                            <p className={`${message.role} conversation`}>
                                                {message.content}
                                            </p>
                                        </div>
                                    ))}
                                    {awaitingResponse && (
                                        <div className="w-fit mx-auto flex items-center gap-2 text-primary-200 mb-10">
                                            <div className="flex gap-1.5 loading-bars h-[30px]">
                                                <div className="h-[30px] w-2 my-auto rounded-lg bg-primary-200 loading-bar" />
                                                <div className="h-[30px] w-2 my-auto rounded-lg bg-primary-200 loading-bar" />
                                                <div className="h-[30px] w-2 my-auto rounded-lg bg-primary-200 loading-bar" />
                                                <div className="h-[30px] w-2 my-auto rounded-lg bg-primary-200 loading-bar" />
                                            </div>
                                            <span>Thinking...</span>
                                        </div>
                                    )}
                                </section>
                                <form 
                                    onSubmit={streamResponse}
                                    className="sticky bottom-0 max-sm:px-5 lg:px-7 py-5 w-full bg-light-300 text-sm text-dark-300"
                                >
                                    <div className="w-full px-3.5 py-3 bg-light-400 rounded-[15px] border flex gap-2.5 
                                        border-primary-100 shadow-[0px_0px_5px_4px_rgba(246,208,145,0.20)]"
                                    >
                                        <textarea 
                                            ref={textareaRef}
                                            name="prompt" 
                                            placeholder="Ask me anything about your store..."
                                            value={textareaValue}
                                            onChange={(e) => setTextareaValue(e.target.value)}
                                            className="prompt w-full h-[76px] bg-transparent focus:outline-none resize-none"
                                            onInput={handleInput}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    streamResponse(e);
                                                }
                                            }}
                                        />
                                        <button type="submit" className="text-2xl text-primary-400 mt-auto">
                                            <PiPaperPlaneRightFill />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                ):(
                    <ZeroStores />
                )}
            </>)}
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