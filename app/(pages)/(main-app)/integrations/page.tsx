import { ConnectedCard, DisconnectedCard } from "../components/StoreCards";


const Integrations = () => {
    return (  
        <main className="h-full py-5 overflow-y-auto">
            <section className="app-container overflow-y-auto pb-5" >
                <h1>Connect Ecommerce Channel</h1>
                <div className="w-full flex flex-col gap-5 my-5">
                    <ConnectedCard 
                        logoUrl="/integrations/shopify.svg"
                        logoAltText="Shopify"
                        description="My Shopify Store(s)"
                        stores={["sample.myshopify.com", "mkbh.myshopify.com"]}
                    />
                </div>
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
        </main>
    );
}
 
export default Integrations;