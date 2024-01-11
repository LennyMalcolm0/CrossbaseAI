import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { BaseInsight } from "./useGetInsights";

type ManageInsight = {
    id: string;
    title: string;
}

type ActiveStore = {
    store: string;
    insights: BaseInsight[];
    setStore: (store: string) => void;
    setInsights: (insights: BaseInsight[]) => void;
    updateInsightTitle: ({ id, title }: ManageInsight) => void;
    addNewInsight: ({ id, title }: ManageInsight) => void;
    clearStore: () => void;
}

/** 
 * Zustand store to manage the currently selected store. It contains methods to save 
 * the `store id`, `store insights`, and also methods to `add` and `update` store insights
 */
export const useActiveStore = create(
    persist<ActiveStore>(
        (set) => ({
            store: "",
            insights: [],
            setStore: (store: string) => set({ store }),
            setInsights: (insights: BaseInsight[]) => set({ insights }),
            updateInsightTitle: ({ id, title }: ManageInsight) => {
                set((state) => ({
                    ...state,
                    insights: state.insights.map((insight) => {
                        if (insight.id === id) {
                            return { 
                                ...insight, 
                                title,
                                updatedAt: (new Date()).toISOString()
                            }
                        }
                        return insight
                    })
                }))
            },
            addNewInsight: ({ id, title }: ManageInsight) => {
                set((state) => ({
                    ...state,
                    insights: [
                        ...state.insights,
                        {
                            id,
                            title,
                            pinned: false,
                            updatedAt: (new Date()).toISOString()
                        }
                    ]
                }))
            },
            clearStore: () => {
                set({ store: "", insights: [] })
            },
        }),
        {
            name: "active-store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useActiveStore;