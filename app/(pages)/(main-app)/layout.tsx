"use client"
import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/app/Firebase";
import { getLsItem, setLsItem, removeLsItem } from "@/app/utils/secureLs";
import { useEffect } from "react";

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                if (!getLsItem("@user")) setLsItem("@user", "true");
            } else {
                if (getLsItem("@user")) removeLsItem("@user");
                router.push("/sign-in");
            }
        });
    
        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const checkPath = (path: string) => pathname === path;
    
    return (
        <div className="w-full h-[100svh] flex flex-col">
            <header className="w-[100%] py-3 sm:py-5 bg-dark-300 border-b-2 border-dark-200">
                <div className="app-container flex items-center justify-between">
                    <Image 
                        src="/crossbase-logo-white.svg" 
                        alt="crossbase.ai" 
                        width={0} 
                        height={0} 
                        className="h-auto w-auto sm:scale" 
                    />
                    <div className="flex items-center">
                        <Link href="" className="py-2 px-3 border-r border-light-400 text-2xl text-light-400 mr-3">
                            <IoMdNotifications />
                        </Link>
                        <Link href="" className="h-8 w-8 rounded-full bg-dark-200 text-xl text-light-400 grid place-content-center">
                            <FiUser />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="grow">
                <div className="app-container h-full flex flex-col">
                    <div className="py-5 flex items-center gap-4 text-sm text-light-400 font-medium">
                        <Link 
                            href="/" 
                            className={`${checkPath("/") ? "text-light-200 font-bold border-light-200" : "border-transparent"} 
                                pb-2.5 border-b-2 hover:text-light-200`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/inventory"  
                            className={`${checkPath("/inventory") ? "text-light-200 font-bold border-light-200" : "border-transparent"} 
                                pb-2.5 border-b-2 hover:text-light-200 `}
                        >
                            Inventory
                        </Link>
                        <Link 
                            href="/integrations"  
                            className={`${checkPath("/integrations") ? "text-light-200 font-bold border-light-200" : "border-transparent"}
                                pb-2.5 border-b-2 hover:text-light-200`}
                        >
                            Integrations
                        </Link>
                    </div>
                    {children}
                </div>
            </div>

            {/* <footer className="max-sm:hidden w-full h-[60px] bg-dark-400 border-t-2 
                border-dark-200 text-xs text-light-400 grid place-content-center"
            >
                © 2023 Crossbase Inc.  All Rights Reserved
            </footer> */}
        </div>
    );
}
 
export default MainAppLayout;