"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/app/Firebase";
import { useRef, useState } from "react";
import { useClickAway, useLockFn } from "ahooks";
import { useUnauthenticatedUserCheck } from "@/app/utils/auth";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { TbHome2 } from "react-icons/tb";
import { FiLink } from "react-icons/fi";

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    useUnauthenticatedUserCheck(router);
    const pathname = usePathname();
    const profileIconRef = useRef<HTMLDivElement>(null);
    const [displayProfileMenu, setDisplayProfileMenu] = useState(false);
    const [displayLogoutPopup, setDisplayLogoutPopup] = useState(false);
    
    const checkPath = (path: string) => pathname === path;

    useClickAway(() => {
        displayProfileMenu && setDisplayProfileMenu(false);
    }, [profileIconRef]);
    
    const logoutUser = useLockFn(async () => {
        try {
            await auth.signOut();
            
            router.push("/sign-in");
        } catch {
            alert("Something went wrong. Please try again.");
        }
    });
    
    return (
        <div className="w-full h-full flex flex-col">
            <header className="w-full bg-light-400 border-b-2 border-light-200">
                <div className="app-container h-[60px] flex items-center justify-between relative">
                    <Link href="/">
                        <Image 
                            src="/crossbase-ai.svg" 
                            alt="crossbase.ai" 
                            width={0} 
                            height={0} 
                            className="h-auto w-auto sm:scale" 
                        />
                    </Link>
                    <div className="flex items-center gap-2.5">
                        <div className="h-[34px] pl-[15px] pr-2.5 bg-light-300 rounded-full 
                            flex items-center justify-center gap-1.5 text-sm cursor-pointer header-element"
                        >
                            <span className="text-dark-100 font-medium max-w-[180px] ellipses">sample.myshopify.com</span>
                            <FaChevronDown />
                        </div>
                        <Link 
                            href="/account"
                            className="h-[34px] w-[34px] rounded-full bg-light-300 text-[19px] text-light-100
                            grid place-content-center cursor-pointer header-element"
                        >
                            <FiUser />
                        </Link>
                        <button className="h-[34px] w-[60px] p-[3px] bg-light-300 rounded-full flex text-light-400 header-element">
                            <div className="h-full w-[28px] bg-light-100 rounded-full text-xl grid place-content-center">
                                <LuSun />
                                <FaRegMoon className="hidden" />
                            </div>
                        </button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                        <Link 
                            href="/"
                            className={`nav-link ${checkPath("/") ? "active" : ""}`}
                        >
                            <TbHome2 className="text-[18px]" />
                            <span>Home</span>
                        </Link>
                        <Link 
                            href="/integrations"
                            className={`nav-link ${checkPath("/integrations") ? "active" : ""}`}
                        >
                            <FiLink className="text-[18px]" />
                            <span>Connect</span>
                        </Link>
                    </div>
                </div>
            </header>

            {children}
            
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
                        <p className="text-sm my-[30px] text-light-400">
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

            {/* <footer className="w-full py-5 bg-light-400 text-center text-xs text-dark-400 border-t-2 border-light-200">
                © 2023 Crossbase Inc. All Rights Reserved
            </footer> */}
        </div>
    );
}
 
export default MainAppLayout;