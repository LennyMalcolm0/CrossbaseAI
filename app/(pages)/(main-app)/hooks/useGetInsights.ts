import { Insight } from "@/app/models";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useAsyncEffect, useLockFn, useSessionStorageState } from "ahooks";
import { useState } from "react";

type InsightHistory = Omit<Insight, "messages" | "updatedAt">;

export function useGetInsights() {
    const [insights, setInsights] = useState<InsightHistory[]>([]);
    const [storeId] = useSessionStorageState<string>("activeStore");
    const [loading, setLoading] = useState(false);

    useAsyncEffect(useLockFn(async () => {
        if (!storeId) return;
        setLoading(true);

        const { data, error } = await HttpClient.get<InsightHistory[]>(
            `/insights/${storeId}/all`
        );

        if (error || !data) {
            setLoading(false);
            return
        }

        setInsights(data);
        setLoading(false);
    }), [storeId])
    
    return { insights, loading }
}