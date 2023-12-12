"use client"
import Input from "@/app/components/Input";
import Link from "next/link";

const ResetPassword = () => {
    return (  
        <main className="text-xs">
            <h1 className="text-light-100 text-xl leading-[2]">Reset Password</h1>
            <p className="text-xs text-light-400 mb-8">
                Enter your email address and we will send you the verification link to reset your password
            </p>
            <form action="">
                <Input 
                    label="Email Address"
                    labelFor="emailAddress"
                    attributes={{
                        type: "text",
                        placeholder: "Enter your email"
                    }}
                />
                <button type="submit" className="w-full py-[15px] mt-6 bg-primary-100 hover:bg-white font-bold">
                    Get Verification Link
                </button>
            </form>
            <p className="text-light-200 text-center mt-[15px]">
                {"Remember password?"}
                <Link href="/sign-in" className="text-primary-100"> Sign in</Link>
            </p>
        </main>
    );
}
 
export default ResetPassword;