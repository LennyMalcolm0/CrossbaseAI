"use client"
import Link from "next/link";
import { RiShareBoxLine } from "react-icons/ri";
import { SlClose } from "react-icons/sl";

type ConnectStoreProps = {
    closePopup: () => void;
}
const ConnectStore = ({closePopup}: ConnectStoreProps) => {
    return (
        <div className="fixed inset-0 h-[100svh] w-screen bg-dark-100 bg-opacity-70 bg-blur-[12px] grid place-content-center">
            <div className="w-[500px] max-w-[92vw] mx-auto p-5 text-sm rounded-[20px] bg-light-400 border-2 border-light-100">
                <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-bold text-dark-100">Connect Store</h3>
                    <SlClose
                        onClick={closePopup} 
                        className="text-[30px] leading-[1] text-dark-100 hover:scale-[1.1] cursor-pointer" 
                    />
                </div>
                <Link href="/" className="w-fit flex items-center gap-1.5 text-sm font-bold text-primary-400 my-5">
                    <span>Install in Shopify</span>
                    <RiShareBoxLine className="text-[18px]" />
                </Link>
                <p className="text-sm mb-3">
                    Watch the video below to see how to install 
                    <span className="text-primary-400"> Crossbase </span> 
                    directly in your Shopify store.
                </p>
                <div className="h-[250px] w-full rounded-[10px] border border-dark-400 bg-dark-100 bg-opacity-70"></div>
            </div>
        </div>
    );
}
 
export default ConnectStore;