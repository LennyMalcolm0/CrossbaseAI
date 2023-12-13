"use client"
import Input from "@/app/components/Input";
import Link from "next/link";
import { useSignin } from "./useSignin";

const SignIn = () => {
    const { formik, loading, signinWithGoogle } = useSignin();

    return (  
        <main className="text-xs">
            <h1 className="text-light-100 text-xl leading-[2] mb-8">Sign In</h1>
            <form action="">
                <div className="flex flex-col gap-[15px]">
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
                    <Input 
                        label="Password"
                        labelFor="password"
                        attributes={{
                            placeholder: "Your password",
                            name: "password",
                            value: formik.values.password,
                            onChange: formik.handleChange,
                        }}
                        passwordInput
                        error={formik.touched.password && formik.errors.password}
                        extraNodeElement={
                            <p className="error-message text-[11px] text-[#F50449]"></p>
                        }
                    />
                </div>
                <p className="text-light-200 mt-[15px]">
                    Forgot your password?
                    <Link href="/reset-password" className="text-primary-100"> Reset Password</Link>
                </p>
                <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-[15px] mt-6 bg-primary-100 hover:bg-white font-bold"
                >
                    Sign In
                </button>
            </form>
            <div className="flex items-center gap-1.5 my-6">
                <hr className="bg-white-400 grow" />
                <span className="text-white font-medium">Or</span>
                <hr className="bg-white-400 grow" />
            </div>
            <button 
                type="button" 
                disabled={loading}
                onClick={signinWithGoogle}
                className="group w-full py-3 flex items-center justify-center border border-dark-100 hover:border-primary-100"
            >
                <svg className="fill-light-400 group-hover:fill-primary-100 transition-01" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15.0431 8.16868C15.0431 7.6702 15.0027 7.16902 14.9164 6.67862H7.99963V9.50245H11.9606C11.7962 10.4132 11.2681 11.2189 10.4947 11.7308V13.5631H12.8578C14.2455 12.2859 15.0431 10.3997 15.0431 8.16868Z" />
                    <path d="M7.9998 15.3333C9.97757 15.3333 11.6455 14.684 12.8607 13.563L10.4976 11.7308C9.84015 12.1781 8.99138 12.4313 8.0025 12.4313C6.0894 12.4313 4.46731 11.1407 3.8853 9.40543H1.44678V11.2943C2.69164 13.7705 5.22716 15.3333 7.9998 15.3333Z" />
                    <path d="M3.88251 9.40534C3.57534 8.4946 3.57534 7.50842 3.88251 6.59768V4.70883H1.44668C0.406607 6.7809 0.406607 9.22212 1.44668 11.2942L3.88251 9.40534Z" />
                    <path d="M7.9998 3.56913C9.04527 3.55296 10.0557 3.94636 10.8129 4.66848L12.9065 2.57486C11.5808 1.33 9.82128 0.645595 7.9998 0.667151C5.22716 0.667151 2.69164 2.22996 1.44678 4.7089L3.88261 6.59774C4.46192 4.85979 6.08671 3.56913 7.9998 3.56913Z" />
                </svg>
                <span className="text-light-300 group-hover:text-primary-100 font-bold ml-4">Continue with Google</span>
            </button>
            <p className="text-light-200 text-center mt-[15px]">
                {"Don't have an account?"}
                <Link href="/sign-up" className="text-primary-100"> Sign up</Link>
            </p>
        </main>
    );
}
 
export default SignIn;