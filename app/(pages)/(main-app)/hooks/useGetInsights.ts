import { Insight } from "@/app/models";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useAsyncEffect, useLockFn, useRequest, useSessionStorageState } from "ahooks";
import { useEffect, useState } from "react";

type BaseInsight = Omit<Insight, "messages">;
type BaseInsightsByDate = {
    id: string;
    date: string;
    insights: BaseInsight[];
};

function formatInsights(insights: BaseInsight[]) {
    const insightsByDate: BaseInsightsByDate[] = [];

    for (const insight of insights) {
        const date = insight.updatedAt.slice(0, 10);
        const index = insightsByDate.findIndex(
            item => item.date.slice(0, 10) === date
        );

        if (index !== -1) {
            insightsByDate[index].insights.push(insight);
        } else {
            const newObj: BaseInsightsByDate = {
                id: `${Math.random()}-${Math.random()}`,
                date: date,
                insights: [insight]
            };
            insightsByDate.push(newObj);
        }
    }

    return insightsByDate;
}

export function useGetInsights() {
    const [insightsByDate, setInsightsByDate] = useState<BaseInsightsByDate[]>([]);
    const [storeId] = useSessionStorageState<string>("activeStore");
    
    const { run: fetchInsights, loading } = useRequest(
        () => HttpClient.get<BaseInsight[]>(`/insights/${storeId}/all`),
        {
            manual: true,
            onSuccess: (result) => {
                const { data } = result;
                if (data) {
                    setInsightsByDate(formatInsights(data));
                }
            },
        }
    );

    useEffect(() => {
        if (storeId) {
            fetchInsights();
        }
    }, [storeId, fetchInsights]);
    
    return { insightsByDate, loading }
}