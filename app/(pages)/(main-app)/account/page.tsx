"use client"
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { CgCloseO } from "react-icons/cg";
import { auth } from "@/app/Firebase";
import { useLockFn } from "ahooks";
import router from "next/router";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { SlClose } from "react-icons/sl";

const Account = () => {
    const [update, setUpdate] = useState(false);
    const [displayLogoutPopup, setDisplayLogoutPopup] = useState(false);
    
    const logoutUser = useLockFn(async () => {
        try {
            await auth.signOut();
            
            router.push("/sign-in");
        } catch {
            alert("Something went wrong. Please try again.");
        }
    });
    
    return (  
        <main className="h-full app-container py-5 max-sm:flex max-sm:flex-col justify-between">
            <section className="w-full rounded-[20px] bg-light-400 border-2 border-light-200 relative mb-5">
                <div className="flex items-center justify-between font-bold p-5 border-b border-light-200">
                    <h1>Profile</h1>
                    {update ? (
                        <button 
                            onClick={() => setUpdate(prev => !prev)}
                            className="flex items-center gap-1.5 text-xs text-primary-400"
                        >
                            <span>Cancel</span>
                            <CgCloseO className="text-[18px] leading-[1] cursor-pointer" />
                        </button>
                    ):(
                        <button 
                            onClick={() => setUpdate(prev => !prev)}
                            className="flex items-center gap-1.5 text-xs text-primary-400"
                        >
                            <span>Edit</span>
                            <CiEdit className="text-[18px] leading-[1] cursor-pointer" />
                        </button>
                    )}
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-[15px] text-xs">
                    <div className="sm:col-span-2 flex gap-5 max-sm:gap-3">
                        <div className="w-full">
                            <label htmlFor="firstName" className="text-dark-400 leading-[1.6] font-medium capitalize">First Name</label>
                            <input 
                                type="text"
                                name="firstName"
                                disabled={!update}
                                className="profile-input"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="lastName" className="text-dark-400 leading-[1.6] font-medium capitalize">Last Name</label>
                            <input 
                                type="text"
                                name="lastName"
                                disabled={!update}
                                className="profile-input"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="emailAddress" className="text-dark-400 leading-[1.6] font-medium capitalize">Email Address</label>
                        <input 
                            type="text"
                            name="emailAddress"
                            disabled={!update}
                            className="profile-input"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="phoneNumber" className="text-dark-400 leading-[1.6] font-medium capitalize">Phone Number</label>
                        <input 
                            type="text"
                            name="phoneNumber"
                            disabled={!update}
                            className="profile-input"
                        />
                    </div>
                </div>
                {update && (
                    <div className="px-5 pb-5 flex justify-between">
                        <div></div>
                        <button 
                            className="max-sm:w-full ml-auto py-[15px] px-10 text-sm text-primary-400 font-bold max-sm:mt-3
                            hover:bg-primary-400 hover:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]
                            border-2 border-primary-400 max-sm:bg-primary-400 max-sm:text-light-400"
                        > Update
                        </button>
                    </div>
                )}
            </section>
            <button 
                onClick={() => setDisplayLogoutPopup(true)}
                className="max-sm:w-full ml-auto py-[15px] px-10 bg-light-400 text-sm text-primary-400 font-bold 
                hover:bg-primary-400 hover:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]
                border-2 border-primary-400 max-sm:bg-primary-400 max-sm:text-light-400"
            > Logout
            </button>

            {displayLogoutPopup && (
                <div className="fixed inset-0 h-[100svh] w-screen bg-dark-100 bg-opacity-70 bg-blur-[12px] grid place-content-center">
                    <div className="w-[560px] max-w-[92%] mx-auto flex flex-col p-5 rounded-[20px] bg-light-400 border border-light-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[18px] font-bold text-dark-100">Logout</h3>
                            <SlClose
                                onClick={() => setDisplayLogoutPopup(false)} 
                                className="text-[30px] leading-[1] text-dark-100 hover:scale-[1.1] cursor-pointer" 
                            />
                        </div>
                        <p className="text-sm my-[30px] text-dark-400">
                            You’re about to logout from Crossbase. Do you want to proceed?
                        </p>
                        <div className="self-end flex gap-3 text-sm font-bold">
                            <button 
                                onClick={() => setDisplayLogoutPopup(false)} 
                                className="py-3 px-[18px] text-dark-100 hover:bg-primary-400 hover:text-light-400"
                            > Cancel
                            </button>
                            <button 
                                onClick={logoutUser} 
                                className="py-3 px-[18px] bg-primary-100 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]
                                text-dark-100 hover:bg-primary-400 hover:text-light-400"
                            > Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
 
export default Account;