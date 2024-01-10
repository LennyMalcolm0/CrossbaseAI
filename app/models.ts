export type Profile = {
    id: string;
    firstName: string;
    lastName: string;
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
    createdAt: string;
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