"use client"
import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/app/Firebase";
import { getLsItem, setLsItem, removeLsItem } from "@/app/utils/secureLs";
import { useEffect, useRef, useState } from "react";
import { useClickAway, useLockFn } from "ahooks";

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const profileIconRef = useRef<HTMLDivElement>(null);
    const [displayProfileMenu, setDisplayProfileMenu] = useState(false);
    const [displayLogoutPopup, setDisplayLogoutPopup] = useState(false);

    useEffect(() => {
        if (!getLsItem("@user")) router.push("/sign-in");

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

    useClickAway(() => {
        displayProfileMenu && setDisplayProfileMenu(false);
    }, [profileIconRef]);
    
    const logoutUser = useLockFn(async () => {
        try {
            await auth.signOut();
            
            removeLsItem("@user");
            router.push("/sign-in");
        } catch {
            alert("Something went wrong. Please try again.");
        }
    });
    
    return (
        <div className="w-full h-full flex flex-col">
            <header className="w-full py-3 sm:py-5 bg-dark-300 border-b-2 border-dark-200">
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
                        <div className="relative">
                            <div 
                                ref={profileIconRef}
                                onClick={() => setDisplayProfileMenu(prev => !prev)}
                                className="h-8 w-8 rounded-full bg-dark-200 text-xl text-light-400 border-2 
                                border-transparent hover:border-light-400 grid place-content-center cursor-pointer"
                            >
                                <FiUser />
                            </div>
                            {displayProfileMenu && (
                                <div className="absolute top-12 right-0 w-[230px] rounded-[15px] bg-dark-200 
                                    border border-dark-100 text-sm text-light-300 overflow-hidden"
                                >
                                    <Link 
                                        href="" 
                                        className="w-full py-3.5 px-5 flex items-center gap-5 
                                        hover:bg-dark-300 border-b border-dark-100"
                                    >
                                        <IoSettingsOutline className="text-xl" />
                                        <span>Manage Account</span>
                                    </Link>
                                    <button 
                                        onClick={() => setDisplayLogoutPopup(true)} 
                                        className="w-full py-3.5 px-5 flex items-center gap-5 hover:bg-dark-300"
                                    >
                                        <LuLogOut className="text-xl" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="grow flex flex-col">
                <div className="w-full bg-[rgba(17,17,17,0.60)] mb-5">
                    <div className="app-container py-5 flex items-center gap-4 text-sm text-light-400 font-medium">
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
                </div>
                <div className="app-container grow flex flex-col">
                    {children}
                </div>
            </div>
            
            {displayLogoutPopup && (
                <div className="fixed inset-0 h-[100svh] w-screen bg-dark-400 bg-opacity-70 grid place-content-center">
                    <div className="w-[92%] max-w-[560px] mx-auto flex flex-col p-5 rounded-[20px] bg-dark-400 border border-dark-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[18px] font-bold text-[#F2EBFC]">Logout</h3>
                            <AiOutlineCloseCircle 
                                onClick={() => setDisplayLogoutPopup(false)} 
                                className="text-[40px] leading-[1] text-dark-100 hover:text-light-200 cursor-pointer" 
                            />
                        </div>
                        <p className="my-[30px] text-light-400">
                            You’re about to logout from Crossbase. Do you want to proceed?
                        </p>
                        <div className="self-end flex gap-3 text-sm font-bold">
                            <button 
                                onClick={() => setDisplayLogoutPopup(false)} 
                                className="py-3 px-[18px] text-primary-100 hover:bg-light-200"
                            > Cancel
                            </button>
                            <button 
                                onClick={logoutUser} 
                                className="py-3 px-[18px] bg-primary-100 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]
                                text-dark-400 hover:bg-light-200"
                            > Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* <footer className="max-sm:hidden w-full h-[60px] bg-dark-400 border-t-2 
                border-dark-200 text-xs text-light-400 grid place-content-center"
            >
                © 2023 Crossbase Inc.  All Rights Reserved
            </footer> */}
        </div>
    );
}
 
export default MainAppLayout;