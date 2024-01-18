import { createContext } from "react";
import { Store } from "./models";

type UserStoresContextType = {
    connectedStores: Store[];
    loadingConnectedStores: boolean;
    fetchConnectedStores: () => void;
}

export const UserStoresContext = createContext<UserStoresContextType>({
    connectedStores: [],
    loadingConnectedStores: false,
    fetchConnectedStores: () => {}
});