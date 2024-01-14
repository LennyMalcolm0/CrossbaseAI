import { BaseInsight, BaseInsightsByDate, Insight } from "@/app/models";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useAsyncEffect, useLockFn, useRequest, useSessionStorageState } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import useActiveStore from "./useActiveStore";

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

function useGetInsights() {
    const { store, insights, setInsights } = useActiveStore();
    
    const { run: fetchInsights, loading } = useRequest(
        () => HttpClient.get<BaseInsight[]>(`/insights/${store}/all`),
        {
            manual: true,
            onSuccess: ({ data }) => {
                if (data) setInsights(data);
            },
        }
    );

    useEffect(() => {
        if (store) {
            fetchInsights();
        }
    }, [store, fetchInsights]);

    const insightsByDate = useMemo(() => {
        return formatInsights(insights)
    }, [insights])
    
    return { insightsByDate, loading }
}

export default useGetInsights;