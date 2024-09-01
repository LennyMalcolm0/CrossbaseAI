import { BaseInsight, Store } from "@/app/models";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

type ManageInsight = {
    id: string;
    title: string;
}

type DefaultStore = Omit<Store, "id" | "updatedAt">;

type ActiveStore = {
    store: Store;
    defaultStore: DefaultStore;
    insights: BaseInsight[];
    setStore: (store: Store) => void;
    setDefaultStore: (defaultStore: DefaultStore) => void;
    setInsights: (insights: BaseInsight[]) => void;
    updateInsightTitle: ({ id, title }: ManageInsight) => void;
    addNewInsight: ({ id, title }: ManageInsight) => void;
    deleteInsight: (id: string) => void;
    clearStore: () => void;
}

/** 
 * Zustand store to manage the currently selected store. It contains methods to save 
 * the `store id`, `store insights`, and also methods to `add` and `update` store insights
 */
export const useActiveStore = create(
    persist<ActiveStore>(
        (set) => ({
            store: {} as Store,
            defaultStore: {} as DefaultStore,
            insights: [],
            setStore: (store: Store) => set({ store }),
            setDefaultStore: (defaultStore: DefaultStore) => set({ defaultStore }),
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
                        {
                            id,
                            title,
                            pinned: false,
                            updatedAt: (new Date()).toISOString()
                        },
                        ...state.insights
                    ]
                }))
            },
            deleteInsight: (id: string) => {
                set((state) => ({
                    ...state,
                    insights: state.insights.filter(insight => insight.id !== id)
                }))
            },
            clearStore: () => {
                set({ store: {} as Store, insights: [], defaultStore: {} as DefaultStore })
            },
        }),
        {
            name: "active-store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useActiveStore;