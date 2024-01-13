"use client"
import { HiOutlineSparkles } from "react-icons/hi";
import { useGetInsights } from "../hooks/useGetInsights";
import InsightCard from "./InsightCard";
import DateIndicator from "./DateIndicator";

// TODO: Use for history page on mobile
const InsightHistory = () => {
    const { insightsByDate, loading } = useGetInsights();

    return (
        <section className="max-lg:hidden w-[250px] h-full border-2 rounded-[20px] border-light-200 relative">
            <div className="absolute top-0 h-[110px] w-full rounded-t-[20px] primary-gradient" />
            <div className="w-full py-6 h-full flex flex-col relative z-[999]">
                <h1 className="px-5 text-[18px] font-bold text-dark-200 mb-7">History</h1>
                <div className="w-full grow px-5 flex flex-col overflow-y -auto">
                    {(loading && insightsByDate.length < 1) ? (
                        <div className="text-dark-200">Loading...</div>
                    ):(<>
                        {(insightsByDate.length > 0) ? (<>
                            {insightsByDate.map((insightGroup) => (
                                <div key={insightGroup.id} className="w-full mb-7">
                                    <DateIndicator date={insightGroup.date} />

                                    <div className="flex flex-col gap-2">
                                        {insightGroup.insights.map((insight) => (
                                            <div key={insight.id} className="w-full">
                                                <InsightCard 
                                                    key={insight.id} 
                                                    { ...insight } 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>):(
                            <div className="grow grid place-content-center">
                                <div className="p-2 border border-dark-100 rounded-[8px] mx-auto">
                                    <HiOutlineSparkles className="text-xl text-dark-100" />
                                </div>
                                <p className="text-center text-sm text-light-100 mt-5">No history to show</p>
                            </div>
                        )}
                    </>)}
                </div>
            </div>
        </section>
    );
}
 
export default InsightHistory;