import { Insight, Message } from "@/app/models";
import { getCurrentUser } from "@/app/utils/auth";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useAsyncEffect, useLockFn, useSessionStorageState } from "ahooks";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export function useManageInsight() {
    const searchParams = useSearchParams();
    const [storeId] = useSessionStorageState<string>("activeStore");
    const insightsBoxRef = useRef<HTMLElement>(null);
    const [conversation, setConversation] = useState<Message[]>([]);
    const [activeInsight, setActiveInsight] = useState<Insight>({} as Insight);
    const [textareaValue, setTextareaValue] = useState("");
    const [loadingInsight, setLoadingInsight] = useState(false);
    const [awaitingResponse, setAwaitingResponse] = useState(false);

    const updateConversation = (role: "user" | "assistant", content: string) => {
        setConversation(prev => [...prev, { role, content }]);
    };

    const scrollBoxToBottom = () => {
        if (!insightsBoxRef.current) return;

        insightsBoxRef.current.scrollTo({
            top: insightsBoxRef.current.scrollHeight,
            behavior: "smooth"
        });
    }

    useAsyncEffect(useLockFn(async () => {
        const insightId = searchParams.get("insight");
        if (!insightId) return;

        setLoadingInsight(true);

        const { data, error } = await HttpClient.get<Insight>(`/insights/${insightId}`);

        if (error || !data) {
            setLoadingInsight(false);
            return
        }

        setActiveInsight(data);
        setConversation(data.messages);
        scrollBoxToBottom();
    }), [searchParams])

    const handlePrompt = useLockFn(async (e: any) => {
        e.preventDefault();
        if (!insightsBoxRef.current) return;

        const question = textareaValue;
        setTextareaValue("");
        updateConversation("user", question);

        const newQuestion = document.createElement("p");
        newQuestion.classList.add("user");
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
            storeId: storeId || sessionStorage.getItem("activeStore"),
            insightId: activeInsight.id || undefined
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
        newResponse.classList.add("assistant");
        insightsBoxRef.current.appendChild(newResponse);
        scrollBoxToBottom();
        
        if (response.ok && response.body) {
            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();
        
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                newResponse.textContent += value;
                scrollBoxToBottom();
            }

            updateConversation("assistant", newResponse.textContent || "");
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
        handlePrompt
    }
}