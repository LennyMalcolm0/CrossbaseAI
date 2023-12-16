"use client"
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { CgCloseO } from "react-icons/cg";

const Account = () => {
    const [update, setUpdate] = useState(false);
    
    return (  
        <main className="h-full app-container">
            <section className="w-full rounded-[20px] border-2 border-dark-200 relative mb-5">
                <div className="flex items-center justify-between p-5 text-white border-b border-dark-200">
                    <h1>Profile</h1>
                    {update ? (
                        <button 
                            onClick={() => setUpdate(prev => !prev)}
                            className="flex items-center gap-2 text-xs text-primary-200"
                        >
                            <span>Cancel</span>
                            <CgCloseO className="text-xl leading-[1] hover:text-light-200 cursor-pointer" />
                        </button>
                    ):(
                        <button 
                            onClick={() => setUpdate(prev => !prev)}
                            className="flex items-center gap-2 text-xs text-primary-100"
                        >
                            <span>Edit</span>
                            <CiEdit className="text-xl leading-[1] hover:text-light-200 cursor-pointer" />
                        </button>
                    )}
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-[15px] text-xs">
                    <div className="sm:col-span-2 flex gap-5">
                        <div className="w-full">
                            <label htmlFor="firstName" className="text-light-400 font-medium capitalize">First Name</label>
                            <input 
                                type="text"
                                name="firstName"
                                disabled={!update}
                                className={`w-full py-[9px] px-3.5 rounded-[40px] bg-transparent border border-dark-100 text-white 
                                    placeholder:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] mt-2
                                `}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="lastName" className="text-light-400 font-medium capitalize">Last Name</label>
                            <input 
                                type="text"
                                name="lastName"
                                disabled={!update}
                                className={`w-full py-[9px] px-3.5 rounded-[40px] bg-transparent border border-dark-100 text-white 
                                    placeholder:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] mt-2
                                `}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="emailAddress" className="text-light-400 font-medium capitalize">Email Address</label>
                        <input 
                            type="text"
                            name="emailAddress"
                            disabled={!update}
                            className={`w-full py-[9px] px-3.5 rounded-[40px] bg-transparent border border-dark-100 text-white 
                                placeholder:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] mt-2
                            `}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="phoneNumber" className="text-light-400 font-medium capitalize">Phone Number</label>
                        <input 
                            type="text"
                            name="phoneNumber"
                            disabled={!update}
                            className={`w-full py-[9px] px-3.5 rounded-[40px] bg-transparent border border-dark-100 text-white 
                                placeholder:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] mt-2
                            `}
                        />
                    </div>
                </div>
                {update && (
                    <div className="px-5 pb-5 flex justify-between">
                        <div></div>
                        <button 
                            className="ml-auto py-3 px-6 bg-primary-100 text-sm 
                            text-dark-400 font-bold hover:bg-light-200"
                        > Update
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
 
export default Account;