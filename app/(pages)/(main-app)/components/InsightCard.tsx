"use client"
import { Insight } from '@/app/models';
import useUpdateSearchParams from '../hooks/useCustomSearchParams';
import { HiDotsHorizontal } from "react-icons/hi";
import { RiShareBoxLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useToggle, useClickAway } from 'ahooks';
import { useRef, useState } from 'react';
import { SlClose } from "react-icons/sl";
import Input from '@/app/components/Input';
import { FaPlus } from "react-icons/fa6";

type InsightCardProps = Omit<Insight, "messages" | "updatedAt">;
type ActionType = "SHARE" | "RENAME" | "DELETE" | "";

// TODO-NN: Route to "/?insights=dvavfv" directly
// TODO-NN: Update page title based on active insights
export default function InsightCard({ id, title, pinned }: InsightCardProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLDivElement>(null);
    const [menuopened, { toggle }] = useToggle(false);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [actionType, setActionType] = useState<ActionType>("");
    const { searchParams, updateSearchParams } = useUpdateSearchParams();

    useClickAway(() => {
        menuopened && toggle();
    }, [menuRef, menuButtonRef]);

    const selectInsight = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.id !== "menu") updateSearchParams({ insight: id });
    };

    const openPopup = (type: ActionType) => {
        setActionType(type)
        setDisplayPopup(true);
    };

    return (
        <>
        <div
            onClick={selectInsight}
            className={`w-full py-3 px-2.5 bg-light-400 rounded-[10px] flex items-center 
                justify-between gap-1.5 text-xs text-dark-400 cursor-pointer 
                ${searchParams.get("insight") === id ? "active-insight" : "hover:shadow-md"}
            `}
        >
            <span className="w-full ellipses">{title}</span>
            <div className="relative py-0.5">
                <HiDotsHorizontal 
                    id="menu"
                    ref={menuButtonRef}
                    onClick={toggle}
                    className="text-light-100 text-base hover:scale-[1.1] hover:text-dark-100" 
                />
                {menuopened && (
                    <div 
                        ref={menuRef}
                        className="absolute top-6 left-0 w-[80px] bg-light-400 rounded-[10px] text-sm sm:text-[10px] 
                        text-light-100 font-medium shadow-[-10px_-5px_30px_0px_rgba(0,0,0,0.15)] z-[999] overflow-hidden"
                    >
                        <div 
                            onClick={() => openPopup("SHARE")}
                            className="w-full p-2 flex items-center gap-1.5 hover:bg-light-300"
                        >
                            <RiShareBoxLine />
                            <span>Share</span>
                        </div>
                        <div 
                            onClick={() => openPopup("RENAME")}
                            className="w-full p-2 flex items-center gap-1.5 hover:bg-light-300"
                        >
                            <FiEdit />
                            <span>Rename</span>
                        </div>
                        <div 
                            onClick={() => openPopup("DELETE")}
                            className="w-full p-2 flex items-center gap-1.5 text-primary-200 hover:bg-light-300"
                        >
                            <HiOutlineTrash />
                            <span>Delete</span>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {displayPopup && (
            <div className="fixed inset-0 h-[100svh] w-screen bg-dark-100 bg-opacity-70 grid place-content-center z-[99999999]">
                <div className="w-[400px] max-w-[92vw] mx-auto flex flex-col p-5 rounded-[20px] bg-light-400 border border-light-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[18px] font-bold text-dark-100">
                            {actionType === "SHARE"
                                ? "Share Insight"
                                : actionType === "RENAME"
                                    ? "Rename Insight"
                                    : "Delete Insight"
                            }
                        </h3>
                        <SlClose
                            onClick={() => setDisplayPopup(false)} 
                            className="text-[30px] leading-[1] text-dark-100 hover:scale-[1.1] cursor-pointer" 
                        />
                    </div>
                    {actionType === "SHARE" ? (
                        <div className="w-full py-5">
                            <Input 
                                label="Recipient’s Email Address"
                                labelFor="emailAddress"
                                attributes={{ 
                                    placeholder: "Enter email address"
                                }}
                            />
                            <button 
                                // onClick={createNewInsight}
                                className="mt-2.5 text-primary-400 flex items-center gap-1 text-xs font-bold"
                            >
                                <span>Add Email</span>
                                <FaPlus className="text-sm" />
                            </button>
                            <p className="text-xs text-primary-400 pt-5">
                                Note that messages you send after sharing this 
                                conversation {"won't"} be shared with the recipient(s).
                            </p>
                        </div>
                    ): actionType === "RENAME" ? (
                        <div className="w-full py-5">
                            <Input 
                                attributes={{ 
                                    placeholder: "Enter name"
                                }}
                            />
                        </div>
                    ):(
                        <p className="text-sm my-[30px] text-dark-400">
                            You’re about to delete this conversation thread. Do you want to proceed?
                        </p>
                    )}
                    <button 
                        // onClick={logoutUser} 
                        className="w-full py-4 px-[18px] bg-primary-100 text-sm text-dark-100 hover:bg-primary-400 
                        hover:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] font-bold"
                    >
                        {actionType === "SHARE"
                                ? "Share"
                                : actionType === "RENAME"
                                    ? "Rename"
                                    : "Delete"
                            }
                    </button>
                </div>
            </div>
        )}
        </>
    );
}