export type Profile = {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
};
   
export enum StoreType {
    SHOPIFY = "SHOPIFY",
    AMAZON = "AMAZON",
    WOO_COMMERCE = "WOO_COMMERCE",
    GUMROAD = "GUMROAD",
}
   
export type Store = {
    id: string;
    type: StoreType;
    url: string;
    updatedAt: string;
};

export type StoresByType = {
    id: string;
    type: StoreType;
    stores: Store[];
};

export type NewUserWithStore = {
    firstName: string;
    lastName: string;
    storeDomain?: string;
    type?: string;
}
   
export type Message = {
    role: "user" | "assistant";
    content: string;
};

export type Insight = {
    id: string;
    title: string;
    messages: Message[];
    pinned: boolean;
    updatedAt: string;
};

export type BaseInsight = Omit<Insight, "messages">;

export type BaseInsightsByDate = {
    id: string;
    date: string;
    insights: BaseInsight[];
};