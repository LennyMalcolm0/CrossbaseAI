import StoreCard from "./integrations/StoreCard";

const Home = () => {
    return (  
        <main>
            <div className="grid grid-cols-3 gap-[15px]">
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
            </div>
        </main>
    );
}
 
export default Home;