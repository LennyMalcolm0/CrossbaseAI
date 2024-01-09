import { auth } from "@/app/firebase";
import { getCurrentUser } from "@/app/utils/auth";
import { useClickAway, useLockFn } from "ahooks";
import { 
    verifyPasswordResetCode, 
    applyActionCode, 
    sendEmailVerification, 
    confirmPasswordReset, 
    signInWithEmailAndPassword 
} from "firebase/auth";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { SetNewPasswordForm } from "../models";
import { setNewPasswordSchema } from "../schemas";

function useValidateActionCode() {
    const router = useRouter();
    const [validActionCode, setValidActionCode] = useState(false);
    const [verifiedEmail, setVerifiedEmail] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");
    const searchParams = useSearchParams();
    const actionCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");

    useEffect(() => {
        if (searchParams.size === 0) return;
        if (!actionCode) return;
        if (!mode) return;

        switch (mode) {
            case 'resetPassword':
                verifyPasswordResetCode(auth, actionCode).then((email) => {
                    setValidActionCode(true);
                    setEmailAddress(email);
                }).catch(() => {
                    alert("Invalid or expired action code. Try getting a new password reset link.");
                    router.push("/reset-password");
                    return
                });
                break;
            case 'verifyEmail':
                applyActionCode(auth, actionCode).then(() => {
                    setVerifiedEmail(true);
                    setValidActionCode(true);
                    setTimeout(() => router.push("/"), 2000);
                }).catch(async () => {
                    const user = await getCurrentUser();

                    if (user) {
                        await sendEmailVerification(user);
                        alert("Invalid or expired action code. A new verification link has been sent to you.");
                        router.push("/");
                        return
                    } else {
                        alert("Invalid or expired action code. Try again.");
                        router.push("/");
                        return
                    }
                });
                break;
            default:
                router.push("/sign-in");
        }
    }, [actionCode, mode, router, router.push, searchParams])

    return { 
        validActionCode,
        verifiedEmail, 
        emailAddress, 
        router, 
        searchParams,
    }
}

export function useAuthAction() {
    const { 
        validActionCode, 
        verifiedEmail, 
        emailAddress, 
        searchParams, 
        router 
    } = useValidateActionCode();
    const [loading, setLoading] = useState(false);
    const passwordFieldRef = useRef<HTMLDivElement>(null);
    const [passwordRequirementPopup, setPasswordRequirementPopup] = useState(false);

    useClickAway(() => {
        passwordRequirementPopup && setPasswordRequirementPopup(false);
    }, [passwordFieldRef]);

    const handleSetNewPassword = useLockFn(async (data: SetNewPasswordForm) => {
        const actionCode = searchParams.get("oobCode");
        if (!actionCode) {
            alert("Password reset code not found!")
            router.push("/reset-password");
            return
        }
        setLoading(true);

        try {
            await confirmPasswordReset(auth, actionCode, data.newPassword);

            try {
                await signInWithEmailAndPassword(auth, emailAddress, data.newPassword);

                router.push("/");
            } catch {
                setLoading(false);
                alert("An error occured while signing you in.");
                router.push("/sign-in");
                return
            }
        } catch {
            setLoading(false);
            alert("An error occurred during confirmation. The code might have expired, try getting a new password reset link.");
        }
    });

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmedPassword: "",
        },
        validationSchema: setNewPasswordSchema,
        onSubmit: (values) => handleSetNewPassword(values),
    });

    return {
        validActionCode, 
        verifiedEmail, 
        formik, 
        loading, 
        passwordFieldRef,
        passwordRequirementPopup,
        setPasswordRequirementPopup,
    }
}