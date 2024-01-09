import { Insight } from "@/app/models";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useAsyncEffect, useSessionStorageState } from "ahooks";
import { useState } from "react";

type InsightHistory = Omit<Insight, "messages" | "updatedAt">;

export function useGetInsights() {
    const [insights, setInsights] = useState<InsightHistory[]>([]);
    const [store] = useSessionStorageState<string>("activeStore");
    const [loading, setLoading] = useState(false);

    useAsyncEffect(async () => {
        if (!store) return;
        setLoading(true);

        const { data, error } = await HttpClient.get<InsightHistory[]>(`/insights/${store}`);

        if (error || !data) {
            throw new Error("Error")
        }

        setInsights(data);
        setLoading(false);
    }, [store])
    
    return { insights, loading }
}