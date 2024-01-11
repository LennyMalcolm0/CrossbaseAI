"use client"
import { Insight } from '@/app/models';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type InsightCardProps = Omit<Insight, "messages" | "updatedAt">;

export default function InsightCard({ id, title, pinned }: InsightCardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // TODO: Route to "/?insights=dvavfv" directly
    // TODO: Update page title based on active insights
    const handleClick = () => {
        const queryParams = new URLSearchParams(searchParams.toString());
        queryParams.set("insight", id);
    
        const newUrl = `${pathname}?${queryParams.toString()}`;
    
        router.push(newUrl);
    };

    return (
        <div
            onClick={handleClick}
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