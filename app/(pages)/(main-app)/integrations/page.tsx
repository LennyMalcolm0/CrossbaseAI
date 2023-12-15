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
                        description="Lorem ipsum dolor sit amet consectetur."
                    />
                    <StoreCard 
                        logoUrl="/integrations/amazon.svg"
                        logoAltText="Amazon"
                        description="Lorem ipsum dolor sit amet consectetur."
                        connected
                    />
                    <StoreCard 
                        logoUrl="/integrations/gumroad.svg"
                        logoAltText="Gumroad"
                        description="Lorem ipsum dolor sit amet consectetur."
                        connected
                    />
                    <StoreCard 
                        logoUrl="/integrations/woo-commerce.svg"
                        logoAltText="Woo Commerce"
                        description="Lorem ipsum dolor sit amet consectetur."
                        comingSoon
                    />
                </div>
            </section>
        </main>
    );
}
 
export default Integrations;