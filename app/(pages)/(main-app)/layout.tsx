"use client"
import Image from "next/image";
import Link from "next/link";
import { useLogoutUser } from "@/app/utils/auth";
import { FiUser } from "react-icons/fi";
import { LuSun } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa6";
import { TbHome2 } from "react-icons/tb";
import { FiLink } from "react-icons/fi";
import { BsBookmarkCheck } from "react-icons/bs";
import SelectStore from "./components/SelectStore";
import { UserStoresContext } from "@/app/context";
import useManageAppLayout from "./hooks/useManageAppLayout";

// TODO ? Hide textarea on scroll
const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
    const logoutUser = useLogoutUser();
    const {
        unverifiedEmail,
        connectedStores,
        loadingConnectedStores,
        checkPath,
        fetchConnectedStores
    } = useManageAppLayout();
    
    return (
        <div className="w-full h-full flex flex-col">
            {/* {!unverifiedEmail ? (<> */}
                <header className="w-full bg-light-400 border-b-2 border-light-200">
                    <div className="app-container h-[60px] flex items-center justify-between relative">
                        <Image 
                            src="/crossbase-ai.svg" 
                            alt="crossbase.ai" 
                            width={0} 
                            height={0} 
                            className="h-auto w-auto" 
                        />
                        <div className="flex items-center gap-2.5">
                            <SelectStore 
                                connectedStores={connectedStores}
                                loadingConnectedStores={loadingConnectedStores}
                            />
                            <Link 
                                href="/account"
                                className="h-[34px] w-[34px] rounded-full bg-light-300 text-[19px] text-light-100
                                grid place-content-center cursor-pointer header-element"
                            >
                                <FiUser />
                            </Link>
                            {/* <button className="max-sm:hidden h-[34px] w-[60px] p-[3px] bg-light-300 rounded-full flex text-light-400 header-element">
                                <div className="h-full w-[28px] bg-light-100 rounded-full text-xl grid place-content-center">
                                    <LuSun />
                                    <FaRegMoon className="hidden" />
                                </div>
                            </button> */}
                        </div>
                        <div className="max-lg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                            <Link 
                                href="/"
                                className={`nav-link ${checkPath("/") ? "active" : "inactive"}`}
                            >
                                <TbHome2 className="text-[18px]" />
                                <span>Home</span>
                            </Link>
                            <Link 
                                href="/integrations"
                                className={`nav-link ${checkPath("/integrations") ? "active" : "inactive"}`}
                            >
                                <FiLink className="text-[18px]" />
                                <span>Connect</span>
                            </Link>
                        </div>
                    </div>
                </header>

                <UserStoresContext.Provider value={{ 
                    connectedStores, 
                    loadingConnectedStores, 
                    fetchConnectedStores 
                }}>
                    <div className="main-section">
                        {children}
                    </div>
                </UserStoresContext.Provider>

                <footer className="lg:hidden w-full py-3 bg-light-400 text-center text-xs text-dark-400 border-t border-light-200">
                    <div className="w-fit flex items-center gap-3 mx-auto">
                        <Link 
                            href="/"
                            className={`nav-link ${checkPath("/") ? "active" : "inactive"}`}
                        >
                            <TbHome2 className="text-[18px]" />
                            <span>Home</span>
                        </Link>
                        <Link 
                            href="/history"
                            className={`nav-link ${checkPath("/history") ? "active" : "inactive"}`}
                        >
                            <BsBookmarkCheck className="text-[18px]" />
                            <span>History</span>
                        </Link>
                        <Link 
                            href="/integrations"
                            className={`nav-link ${checkPath("/integrations") ? "active" : "inactive"}`}
                        >
                            <FiLink className="text-[18px]" />
                            <span>Connect</span>
                        </Link>
                    </div>
                </footer>
            {/* </>):(<>
                <header className="w-full bg-light-400 border-b-2 border-light-200">
                    <div className="app-container h-[60px] flex items-center justify-between relative">
                        <Image 
                            src="/crossbase-ai.svg" 
                            alt="crossbase.ai" 
                            width={0} 
                            height={0} 
                            className="h-auto w-auto" 
                        />
                        <button 
                            onClick={logoutUser}
                            className="h-[34px] px-4 bg-light-300 rounded-full text-dark-100 
                            flex items-center justify-center gap-2 text-sm header-element"
                        >
                            <FiLogOut />
                            <span>Logout</span>
                        </button>
                    </div>
                </header>
                <div className="h-full w-full grid place-content-center px-5 text-center">
                    <h1 className="text-dark-100 text-xl leading-[2] mb-5">
                        Verify your email to continue
                    </h1>
                    <p className="max-sm:text-sm text-dark-300">
                        A verification link has been sent to your email address.
                    </p>
                </div>
            </>)} */}
        </div>
    );
}
 
export default MainAppLayout;