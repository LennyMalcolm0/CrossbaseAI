import { BaseInsight, Insight, Message } from "@/app/models";
import { getCurrentUser } from "@/app/utils/auth";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useLockFn, useRequest } from "ahooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useActiveStore from "./useActiveStore";
import useUpdateSearchParams from "./useCustomSearchParams";

function useGetInsight() {
    const searchParams = useSearchParams();
    const insightId = searchParams.get("insight");
    const insightsBoxRef = useRef<HTMLElement>(null);
    const [conversation, setConversation] = useState<Message[]>([]);
    const [activeInsight, setActiveInsight] = useState<BaseInsight>();

    const scrollBoxToBottom = useCallback(() => setTimeout(() => {
        if (!insightsBoxRef.current) return;

        insightsBoxRef.current.scrollTo({
            top: insightsBoxRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, 100), [])
    
    // TODO: Apply useLockFn to run request once. Use runAsync and useAsyncEffect
    const { run: fetchInsight, loading: loadingInsight } = useRequest(
        () => HttpClient.get<Insight>(`/insights/${insightId}`),
        {
            manual: true,
            onSuccess: (result) => {
                const { data } = result;
                if (data) {
                    setConversation(data.messages);
                    scrollBoxToBottom();
                    delete (data as any).messages;
                    setActiveInsight(data);
                }
            },
            cacheKey: "activeInsight"
        }
    );

    useEffect(() => {
        if (!insightId) {
            setConversation([]);
            setActiveInsight(undefined);
            return
        }
        fetchInsight();
    }, [insightId, fetchInsight]);

    return {
        insightId,
        insightsBoxRef,
        conversation,
        activeInsight,
        loadingInsight,
        scrollBoxToBottom,
        setConversation,
        setActiveInsight
    }
}

const controller = new AbortController();

function useManageInsight() {
    const router = useRouter();
    const pathname = usePathname();
    const { updateSearchParams } = useUpdateSearchParams();
    const {
        insightId,
        insightsBoxRef,
        conversation,
        activeInsight,
        loadingInsight,
        scrollBoxToBottom,
        setConversation,
        setActiveInsight
    } = useGetInsight();
    const { store, updateInsightTitle, addNewInsight } = useActiveStore();
    const [textareaValue, setTextareaValue] = useState("");
    const [awaitingResponse, setAwaitingResponse] = useState(false);

    const streamResponse = useLockFn(async (e: any) => {
        e?.preventDefault();
        if (!insightsBoxRef.current) return;

        const prompt = textareaValue;
        setTextareaValue("");

        setConversation(prev => [
            ...prev, 
            { role: "user", content: prompt }
        ]);
        setAwaitingResponse(true);
        scrollBoxToBottom();

        const user = await getCurrentUser();
        if (!user || !prompt) return;

        const userIdToken = await user.getIdToken();
        const requestBody = JSON.stringify({
            prompt, 
            conversation, 
            storeId: store,
            insightId: insightId || undefined
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/insights/prompt`, {
            method: "POST",
            body: requestBody,
            headers: {
                Accept: "text/event-stream",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userIdToken}`
            },
            signal: controller.signal
        });

        let responseChunkCount = 0;
        
        if (response.ok && response.body) {
            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();
        
            while (true && !controller.signal.aborted) {
                const { value, done } = await reader.read();
                if (done) break;
                
                if (value.startsWith("___id: ")) {
                    const id = value.split("___id: ")[1];

                    addNewInsight({ id, title: prompt });
                    updateSearchParams({ insight: id });
                    return
                }
                
                setConversation(prev => {
                    if (prev[prev.length - 1].role === "user") {
                        return [
                            ...prev,
                            { role: "assistant", content: value }
                        ]
                    }

                    return [
                        ...prev.slice(0, prev.length - 1),
                        { 
                            role: "assistant", 
                            content: prev[prev.length - 1].content + value
                        }
                    ]
                });

                if (responseChunkCount === 0) {
                    setAwaitingResponse(false);
                    responseChunkCount++
                }
                scrollBoxToBottom();
            }

            if (insightId && !controller.signal.aborted) {
                updateInsightTitle({ 
                    id: insightId, 
                    title: prompt 
                });
            }
        } else {
            setAwaitingResponse(false);
            console.error("Stream response was not ok.");
        }
    });

    const createNewInsight = () => {
        setConversation([]);
        setActiveInsight(undefined);

        router.push(pathname);
    };

    return {
        insightsBoxRef,
        conversation,
        activeInsight,
        textareaValue,
        loadingInsight,
        awaitingResponse,
        setTextareaValue,
        streamResponse,
        createNewInsight,
    }
}

export default useManageInsight;