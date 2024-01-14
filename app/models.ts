export type Profile = {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
};
   
enum StoreType {
    SHOPIFY = "SHOPIFY",
    AMAZON = "AMAZON",
    WOO_COMMERCE = "WOO_COMMERCE",
    GUMROAD = "GUMROAD",
}
   
export type Store = {
    id: string;
    type: StoreType;
    storeUrl: string;
    updatedAt: string;
};
   
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