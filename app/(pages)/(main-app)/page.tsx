/* eslint-disable @next/next/no-img-element */
"use client"
import { HiOutlineSparkles } from "react-icons/hi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { TbCloudDownload } from "react-icons/tb";
import { RiPushpin2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import { getCurrentUser } from "@/app/utils/auth";
import { HttpClient } from "@/app/utils/axiosRequests";

const Home = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [textareaValue, setTextareaValue] = useState("");
    const [response, setResponse] = useState("");
 
    const handleInput = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';

        const minimumHeight = Math.max(textarea.scrollHeight, 76);
        const newHeight = Math.min(minimumHeight, 300);

        textarea.style.height = `${newHeight}px`;
    };

    const handlePrompt = async (e: any) => {
        e.preventDefault();

        const prompt = textareaValue;
        setTextareaValue("");

        const user = await getCurrentUser();
        if (!user || !prompt) return;

        const userIdToken = await user.getIdToken();

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/stream`, {
            method: "POST",
            body: JSON.stringify({ prompt }),
            headers: {
                Accept: "text/event-stream",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userIdToken}`
            }
        });
        
        if (response.ok && response.body) {
            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();
        
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                console.log("Received: ", value);
                setResponse((prev) => prev + value);
            }
        } else {
            console.error("Stream response was not ok.");
        }
    }
    
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
                <section className="conversation-box lg:border-2 lg:rounded-[20px] lg:border-light-200 relative overflow-hidden">
                    <div className="sm:hid den absolute top-0 h-[110px] w-full primary-gradient" />
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
                            {/* <div 
                                className="py-[13px] px-[15px] w-full rounded-[10px] bg-light-400 flex 
                                items-center gap-[15px] cursor-pointer hover:shadow-sm"
                                dangerouslySetInnerHTML={{ __html: response }}
                            ></div> */}
                            <div className="w-full flex flex-col mt-[80px]">
                                <p className="user w-fit max-w-[95%] pt-2.5 pb-[15px] px-3.5 rounded-b-[8px] mb-5">
                                In this example, we set the Content-Type header to and include the data you want to send in the body. 
                                </p>
                                <p className="assistant w-fit max-w-[95%] pt-2.5 pb-[15px] px-3.5 rounded-b-[8px] mb-5">
                                Please note that if {"you're"} trying to implement server-sent events, the Content-Type is used for the server response, not for the client request.
                                </p>
                            </div>
                        </section>
                        <form 
                            onSubmit={handlePrompt}
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
                                            handlePrompt(e);
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