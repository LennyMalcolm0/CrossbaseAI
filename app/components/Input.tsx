"use client"
import { InputHTMLAttributes, useRef, useState } from "react";
import { FaEye, FaEyeSlash  } from "react-icons/fa";

export interface InputProps {
    label?: string;
    labelFor?: string;
    type?: string;
    attributes?: InputHTMLAttributes<HTMLInputElement>;
    passwordInput?: boolean;
    error?: any;
    extraNodeElement?: React.ReactNode;
}

const Input = ({ 
    label, 
    labelFor,
    type,
    attributes,
    passwordInput,
    extraNodeElement, 
    error
}: InputProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);   

    return ( 
        <div key={labelFor} className="w-full text-xs leading-[20px]">
            {label && <label htmlFor={labelFor} className="text-[#D8D8D8] font-medium capitalize">{label}</label>}

            <div className="relative w-full mt-1">
                <input 
                    type={type || (passwordVisible ? "text" : "password")}
                    className={`w-full py-[9px] px-3.5 rounded-[40px] bg-transparent border border-dark-100 text-white 
                    placeholder:text-light-400 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]
                    `}
                    {...attributes}
                />

                {passwordInput && (
                    <div 
                        className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[#98A2B3] cursor-pointer"
                        onClick={() => setPasswordVisible(prev => !prev)}
                    >
                        {!passwordVisible ? (
                            <FaEye className="text-base" /> 
                        ):(
                            <FaEyeSlash className="text-base" />
                        )}
                    </div>
                )}
            </div>

            {error ? (
                <p className="text-[11px] text-[#F50449] pl-4 mt-[2px]">{error}</p> 
            ):(
                <div className="pl-4 mt-[2px]">{extraNodeElement}</div>
            )}
        </div>
    );
}
 
export default Input;