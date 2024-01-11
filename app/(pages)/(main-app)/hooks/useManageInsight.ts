import { Insight, Message } from "@/app/models";
import { getCurrentUser } from "@/app/utils/auth";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useLockFn, useRequest } from "ahooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useActiveStore from "./useActiveStore";

function useGetInsight() {
    const searchParams = useSearchParams();
    const insightId = searchParams.get("insight");
    const insightsBoxRef = useRef<HTMLElement>(null);
    const [conversation, setConversation] = useState<Message[]>([]);
    const [activeInsight, setActiveInsight] = useState<Insight>({} as Insight);

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
                    setActiveInsight(data);
                    setTimeout(() => scrollBoxToBottom(), 200);
                    setConversation(data.messages);
                }
            },
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

export function useManageInsight() {
    const router = useRouter();
    const pathname = usePathname();
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

        const newQuestion = document.createElement("p");
        newQuestion.classList.add("user", "conversation");
        newQuestion.textContent = question;
        insightsBoxRef.current.appendChild(newQuestion);
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

        setAwaitingResponse(false);
        const newResponse = document.createElement("p");
        newResponse.classList.add("assistant", "conversation");
        insightsBoxRef.current.appendChild(newResponse);
        scrollBoxToBottom();
        
        if (response.ok && response.body) {
            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();
        
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                if (value.startsWith("___id: ")) {
                    addNewInsight({ 
                        id: value.split("___id: ")[1], 
                        title: question 
                    });
                }
                
                newResponse.textContent += value;
                scrollBoxToBottom();
            }

            if (insightId) {
                updateInsightTitle({ 
                    id: insightId, 
                    title: question 
                });
            }

            setConversation(prev => [
                ...prev, 
                { 
                    role: "assistant", 
                    content: newResponse.textContent || "" 
                }
            ]);
        } else {
            console.error("Stream response was not ok.");
        }
    });

    return {
        insightsBoxRef,
        conversation,
        activeInsight,
        textareaValue,
        loadingInsight,
        awaitingResponse,
        setTextareaValue,
        handlePrompt,
    }
}