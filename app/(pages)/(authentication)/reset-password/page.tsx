"use client"
import Input from "@/app/components/Input";
import Link from "next/link";
import { useResetPassword } from "./useResetPassword";

const ResetPassword = () => {
    const { formik, loading } = useResetPassword();

    return (
        <main className="text-xs pb-10">
            <h1 className="text-dark-100 text-xl leading-[2]">Reset Password</h1>
            <p className="text-xs text-dark-400 mb-5">
                Enter your email address and we will send you the verification link to reset your password
            </p>
            <form onSubmit={formik.handleSubmit}>
                <Input 
                    label="Email Address"
                    labelFor="emailAddress"
                    attributes={{
                        type: "text",
                        placeholder: "Enter your email", 
                        name: "emailAddress",
                        value: formik.values.emailAddress,
                        onChange: formik.handleChange,
                    }}
                    error={formik.touched.emailAddress && formik.errors.emailAddress}
                    extraNodeElement={
                        <p className="error-message text-[11px] text-[#F50449]"></p>
                    }
                />
                <button 
                    disabled={loading} 
                    type="submit" 
                    className="auth"
                >
                    Get Verification Link
                </button>
            </form>
            <p className="text-dark-200 text-center mt-[15px]">
                {"Remember password?"}
                <Link href="/sign-in" className="auth-sub-link"> Sign In</Link>
            </p>
        </main>
    );
}
 
export default ResetPassword;