"use client"
import { HiOutlineSparkles } from "react-icons/hi";
import { useGetInsights } from "../hooks/useGetInsights";
import InsightCard from "./InsightCard";

const InsightHistory = () => {
    const { insights, loading } = useGetInsights();

    return (
        <section className="max-lg:hidden w-[250px] h-full border-2 rounded-[20px] border-light-200 relative overflow-hidden">
            <div className="absolute top-0 h-[110px] w-full primary-gradient" />
            <div className="w-full px-5 py-6 h-full flex flex-col relative z-[9999]">
                <h1 className="text-[18px] font-bold text-dark-200">History</h1>
                {loading ? (
                    <div>Loading...</div>
                ):(<>
                    {(insights.length < 1) ? (
                        <div className="mt-6 flex flex-col gap-2">
                            {insights.map((insight) => (
                                <InsightCard key={insight.id} {...insight} />
                            ))}
                        </div>
                    ):(
                        <div className="grow grid place-content-center">
                            <div className="p-2 border border-dark-100 rounded-[8px] mx-auto">
                                <HiOutlineSparkles className="text-xl text-dark-100" />
                            </div>
                            <p className="text-center text-sm text-light-100 mt-5">No history to show</p>
                        </div>
                    )}
                </>)}
            </div>
        </section>
    );
}
 
export default InsightHistory;