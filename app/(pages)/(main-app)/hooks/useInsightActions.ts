import { HttpClient } from "@/app/utils/axiosRequests";
import { useState } from "react";
import useCustomSearchParams from "../../../hooks/useCustomSearchParams";
import useActiveStore from "./useActiveStore";
import { useLockFn } from "ahooks";

type ActionType = "SHARE" | "RENAME" | "DELETE" | "";

function useInsightActions(insightId: string) {
    const { searchParams, updateSearchParams } = useCustomSearchParams();
    const [displayPopup, setDisplayPopup] = useState(false);
    const [actionType, setActionType] = useState<ActionType>("");
    const [inputValue, setInputValue] = useState("");
    const { deleteInsight: deleteFromStore } = useActiveStore();
    const [actionLoading, setActionLoading] = useState(false);

    const deleteInsight = async () => {
        deleteFromStore(insightId);
        setDisplayPopup(false);
        
        if (searchParams.get("insight") === insightId) {
            updateSearchParams({});
        }

        return await HttpClient.delete<string>(`/insights/${insightId}`);
    };

    const buttonAction = useLockFn(async () => {
        switch(actionType) {
            case "DELETE": 
                await deleteInsight();
                break;
            default:
                console.log("Not Integrated");
        }
    });

    return {
        displayPopup,
        actionType,
        searchParams,
        inputValue,
        actionLoading,
        setInputValue,
        setActionType,
        updateSearchParams,
        setDisplayPopup,
        buttonAction,
    }
}

export default useInsightActions;