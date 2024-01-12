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

    const scrollBoxToBottom = useCallback(() => {
        if (!insightsBoxRef.current) return;

        insightsBoxRef.current.scrollTo({
            top: insightsBoxRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, [])
    
    // TODO: Apply useLockFn to run request once. Use runAsync and useAsyncEffect
    const { run: fetchInsight, loading: loadingInsight } = useRequest(
        () => HttpClient.get<Insight>(`/insights/${insightId}`),
        {
            manual: true,
            onSuccess: (result) => {
                const { data } = result;
                if (data) {
                    setConversation(data.messages);
                    setTimeout(() => scrollBoxToBottom(), 100);
                    delete (data as any).messages;
                    setActiveInsight(data);
                }
            },
            cacheKey: "activeInsight"
        }
    );

    useEffect(() => {
        if (insightId) {
            fetchInsight();
        }
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

    const handlePrompt = useLockFn(async (e: any) => {
        e.preventDefault();
        if (!insightsBoxRef.current) return;

        const question = textareaValue;
        setTextareaValue("");

        setConversation(prev => [
            ...prev, 
            { role: "user", content: question }
        ]);
        setAwaitingResponse(true);
        scrollBoxToBottom();

        const user = await getCurrentUser();
        if (!user || !question) return;

        const userIdToken = await user.getIdToken();
        const requestBody = JSON.stringify({
            question, 
            conversation, 
            storeId: store,
            insightId: insightId || undefined
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/insights/question`, {
            method: "POST",
            body: requestBody,
            headers: {
                Accept: "text/event-stream",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userIdToken}`
            }
        });
        
        if (response.ok && response.body) {
            setAwaitingResponse(false);
            scrollBoxToBottom();

            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();
        
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                if (value.startsWith("___id: ")) {
                    const id = value.split("___id: ")[1];
                    
                    addNewInsight({ id, title: question });
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
                scrollBoxToBottom();
            }

            if (insightId) {
                updateInsightTitle({ 
                    id: insightId, 
                    title: question 
                });
            }
        } else {
            console.error("Stream response was not ok.");
        }
    });

    const handleNewInsight = () => {
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
        handlePrompt,
        handleNewInsight,
    }
}

export default useManageInsight;