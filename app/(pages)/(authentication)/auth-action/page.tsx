"use client"
import Input from "@/app/components/Input";
import Link from "next/link";

const AuthAction = () => {
    return (  
        <main className="text-xs">
            <h1 className="text-light-100 text-xl leading-[2]">Set New Password</h1>
            <p className="text-xs text-light-400 mb-8">Enter your new password below</p>
            <form action="">
                <Input 
                    label="New Password"
                    labelFor="password"
                    attributes={{
                        placeholder: "Your password"
                    }}
                    passwordInput
                />
                <Input 
                    label="Confirm New Password"
                    labelFor="confirmedPassword"
                    attributes={{
                        placeholder: "Your password"
                    }}
                    passwordInput
                />
                <button type="submit" className="w-full py-[15px] mt-6 bg-primary-100 hover:bg-white font-bold">
                    Reset Password
                </button>
            </form>
        </main>
    );
}
 
export default AuthAction;