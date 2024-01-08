"use client"
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { CgCloseO } from "react-icons/cg";

const Account = () => {
    const [update, setUpdate] = useState(false);
    
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
                className="max-sm:w-full ml-auto py-[15px] px-10 bg-light-400 text-sm text-primary-400 font-bold 
                hover:bg-primary-400 hover:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]
                border-2 border-primary-400 max-sm:bg-primary-400 max-sm:text-light-400"
            > Logout
            </button>
        </main>
    );
}
 
export default Account;