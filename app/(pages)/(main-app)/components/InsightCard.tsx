"use client"
import { Insight } from '@/app/models';
import useUpdateSearchParams from '../hooks/useCustomSearchParams';

type InsightCardProps = Omit<Insight, "messages" | "updatedAt">;

// TODO-NN: Route to "/?insights=dvavfv" directly
// TODO-NN: Update page title based on active insights
export default function InsightCard({ id, title, pinned }: InsightCardProps) {
    const { searchParams, updateSearchParams } = useUpdateSearchParams();

    return (
        <div
            onClick={() => updateSearchParams({ insight: id })}
            className={`w-full py-3 px-2.5 bg-light-400 rounded-[10px] flex items-center gap-1.5 text-xs cursor-pointer
                ${searchParams.get("insight") === id ? "active-insight" : "hover:shadow-md"} text-dark-400
            `}
        >
            <span className="w-full ellipses">{title}</span>
            <div className={`h-[9px] w-[9px] rounded-full 
                ${
                    searchParams.get("insight") === id
                    ? "bg-primary-300"  
                    : pinned 
                        ? "bg-primary-200" 
                        : "bg-light-200" }  
                `} 
            />
        </div>
    );
}