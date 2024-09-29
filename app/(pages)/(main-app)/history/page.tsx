"use client"
import { useRouter } from "next/navigation";
import InsightHistory from "../components/InsightHistory";
import { useEffect } from "react";

const History = () => {
    const router = useRouter(); 
    const screenWidth = window.innerWidth;

    useEffect(() => {
        if (screenWidth > 1100) {
            router.push("/");
        }
    }, [screenWidth, router])
    
    return (
        <main className="h-full lg:py-5">
            <div className="h-full app-container-2 flex gap-5">
                <InsightHistory />
            </div>
        </main>
    );
}
 
export default History;