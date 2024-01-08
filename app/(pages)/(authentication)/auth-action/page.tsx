"use client"
import Input from "@/app/components/Input";
import { useAuthAction } from "./useAuthAction";

const AuthAction = () => {
    const {
        validActionCode, 
        verifiedEmail, 
        formik, 
        loading, 
        passwordFieldRef,
        passwordRequirementPopup,
        setPasswordRequirementPopup,
    } = useAuthAction();

    return (  
        <main>
            {validActionCode ? (<>
                {verifiedEmail ? (
                    <section>
                        <h1 className="text-dark-100 text-xl leading-[2]">Email Verified</h1>
                        <p className="text-sm">{"You'll be redirected to the app shortly..."}</p>
                    </section>
                ):(
                    <form onSubmit={formik.handleSubmit} className="text-xs">
                        <h1 className="text-dark-100 text-xl leading-[2]">Set New Password</h1>
                        <p className="text-xs text-dark-400 mb-5">Enter your new password below</p>
                        <div ref={passwordFieldRef} className="relative z-[999999] mb-[15px]">
                            <Input 
                                label="New Password" 
                                labelFor="newPassword"
                                attributes={{
                                    placeholder: "Your password",
                                    name: "newPassword",
                                    value: formik.values.newPassword,
                                    onChange: formik.handleChange,
                                    onFocus: () => setPasswordRequirementPopup(true), 
                                }}
                                passwordInput
                                error={formik.touched.newPassword && formik.errors.newPassword}
                            />
                            {(passwordRequirementPopup && formik.errors.newPassword) && (
                                <ul className="absolute -mt-1 px-3 py-3 rounded-2xl bg-white border border-[#D4D4D4] text-xs">
                                    <li className="flex items-center">
                                        <i className="fa-solid fa-circle text-[5px] mr-[5px]"></i>
                                        <span>Must be 8 chracters long.</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fa-solid fa-circle text-[5px] mr-[5px]"></i>
                                        <span>Must contain 1 small letter (a...z).</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fa-solid fa-circle text-[5px] mr-[5px]"></i>
                                        <span>Must contain 1 capital letter (A...Z).</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fa-solid fa-circle text-[5px] mr-[5px]"></i>
                                        <span>Must contain 1 special character (!...&).</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fa-solid fa-circle text-[5px] mr-[5px]"></i>
                                        <span>Must contain 1 number (0...9) </span>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <Input 
                            label="Confirm New Password"
                            labelFor="confirmedPassword"
                            attributes={{
                                placeholder: "Your password",
                                name: "confirmedPassword",
                                value: formik.values.confirmedPassword,
                                onChange: formik.handleChange,
                            }}
                            passwordInput
                            error={formik.touched.confirmedPassword && formik.errors.confirmedPassword}
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-[15px] mt-6 bg-primary-100 hover:bg-white font-bold"
                        >
                            Reset Password
                        </button>
                    </form>
                )} 
            </>):(
                <h6>Validating Link...</h6>
            )}
        </main>
    );
}
 
export default AuthAction;