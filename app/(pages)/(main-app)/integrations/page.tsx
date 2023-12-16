import StoreCard from "../components/StoreCard";

const Integrations = () => {
    return (  
        <main className="h-full flex flex-col">
            <h1 className="app-container mb-5">Connect your online stores</h1>
            <section className="app-container grow overflow-y-auto pb-5" >
                <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[15px]">
                    <StoreCard 
                        logoUrl="/integrations/shopify-logo.svg"
                        logoAltText="Shopify"
                        description="Get intelligent insights on your Shopify store."
                    />
                    <StoreCard 
                        logoUrl="/integrations/amazon.svg"
                        logoAltText="Amazon"
                        description="Get intelligent insights on your Amazon FBA."
                        comingSoon
                    />
                    <StoreCard 
                        logoUrl="/integrations/gumroad.svg"
                        logoAltText="Gumroad"
                        description="Get intelligent insights on your Gumroad store."
                        comingSoon
                    />
                    <StoreCard 
                        logoUrl="/integrations/woo-commerce.svg"
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