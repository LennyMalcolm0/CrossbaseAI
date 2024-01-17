"use client"
import { useSearchParams } from "next/navigation";
import ConnectedCard from "./conponents/ConnectedCard";
import DisconnectedCard from "./conponents/DisconnectedCard";
import useManageIntegrations from "./useManageIntegrations";
import ConnectStore from "./conponents/ConnectStore";

const Integrations = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const storeDomain = searchParams.get("shop");
    const { 
        connectedStoresByType, 
        loadingConnectedStores, 
        creatingStore, 
        createdStore,
    } = useManageIntegrations();

    return (  
        <main className="h-full py-5 overflow-y-auto">
            <section className="app-container overflow-y-auto pb-5" >
                <h1 className="mb-5">Connect Ecommerce Channel</h1>
                {connectedStoresByType.length > 1 && (
                    <div className="w-full flex flex-col gap-5 mb-5">
                        {connectedStoresByType.map((group) => (
                            <ConnectedCard
                                key={group.id}
                                type={group.type}
                                stores={group.stores}
                            />
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[15px]">
                    <DisconnectedCard 
                        logoUrl="/integrations/shopify.svg"
                        logoAltText="Shopify"
                        description="Get intelligent insights on your Shopify store."
                    />
                    <DisconnectedCard 
                        logoUrl="/integrations/amazon.svg"
                        logoAltText="Amazon"
                        description="Get intelligent insights on your Amazon FBA."
                        comingSoon
                    />
                    <DisconnectedCard 
                        logoUrl="/integrations/gumroad.svg"
                        logoAltText="Gumroad"
                        description="Get intelligent insights on your Gumroad store."
                        comingSoon
                    />
                    <DisconnectedCard 
                        logoUrl="/integrations/woocommerce.svg"
                        logoAltText="Woo Commerce"
                        description="Get intelligent insights on your WooCommerce store."
                        comingSoon
                    />
                </div>
            </section>

            {type && storeDomain && (
                <ConnectStore 
                    createdStore={createdStore}
                    creatingStore={creatingStore}
                />
            )}
        </main>
    );
}
 
export default Integrations;