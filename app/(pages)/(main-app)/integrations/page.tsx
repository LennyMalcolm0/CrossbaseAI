import StoreCard from "./StoreCard";

const Integrations = () => {
    return (  
        <main className="grow flex flex-col pt-">
            <h1 className="mb-5">Connect your online stores</h1>
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
        </main>
    );
}
 
export default Integrations;