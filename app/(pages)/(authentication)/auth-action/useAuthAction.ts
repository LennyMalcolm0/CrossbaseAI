import { auth } from "@/app/firebase";
import { getCurrentUser } from "@/app/utils/auth";
import { useClickAway, useLocalStorageState, useLockFn } from "ahooks";
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
import { NewUserWithStore } from "@/app/models";
import { HttpClient } from "@/app/utils/axiosRequests";

function useValidateActionCode() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const actionCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");
    const [validActionCode, setValidActionCode] = useState(false);
    const [verifiedEmail, setVerifiedEmail] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");
    const [pageError, setPageError] = useState("");
    const [pageActionLoading, setPageActionLoading] = useState(false);
    const [newUserWithStore, setNewUserWithStore] = useLocalStorageState<NewUserWithStore>(
        "newUserWithStore"
    );

    useEffect(() => {
        if (searchParams.size === 0) return;
        if (!actionCode) return;
        if (!mode) return;

        switch (mode) {
            case "resetPassword":
                verifyPasswordResetCode(auth, actionCode).then((email) => {
                    setValidActionCode(true);
                    setEmailAddress(email);
                }).catch(() => {
                    alert("Invalid or expired action code. Try getting a new password reset link.");
                    router.push("/reset-password");
                    return
                });
                break;
            case "verifyEmail":
                applyActionCode(auth, actionCode).then(() => {
                    setPageActionLoading(true);
                    setVerifiedEmail(true);
                    setValidActionCode(true);

                    if (!newUserWithStore) {
                        setPageActionLoading(false);
                        setTimeout(() => router.push("/"), 1000);
                        return
                    };

                    const { firstName, lastName, storeDomain, type } = newUserWithStore;

                    const navigateToApp = () => {
                        setNewUserWithStore(undefined);
                        setPageActionLoading(false);
                        localStorage.removeItem("newUserWithStore");

                        if (type && storeDomain) {
                            router.push(`/integrations?shop=${storeDomain}&type=${type}`);
                        } else {
                            router.push("/");
                        }
                    };

                    HttpClient.post("/profile", { firstName, lastName })
                        .finally(() => navigateToApp())
                }).catch(async () => {
                    const user = await getCurrentUser();

                    if (user) {
                        await sendEmailVerification(user);
                        alert("Invalid or expired action code. A new verification link has been sent to you.");
                        setPageError("A new verification link has been sent to you.");
                        return
                    } else {
                        alert("Invalid or expired action code. Try signing in to get a new verification link.");
                        router.push("/sign-in");
                        return
                    }
                });
                break;
            default:
                router.push("/sign-in");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newUserWithStore, searchParams])

    return { 
        validActionCode,
        verifiedEmail, 
        emailAddress, 
        router, 
        searchParams,
        pageActionLoading,
        pageError,
        setPageActionLoading,
    }
}

export function useAuthAction() {
    const { 
        validActionCode, 
        verifiedEmail, 
        emailAddress, 
        searchParams, 
        router,
        pageActionLoading,
        pageError,
        setPageActionLoading,
    } = useValidateActionCode();
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
        setPageActionLoading(true);

        try {
            await confirmPasswordReset(auth, actionCode, data.newPassword);

            try {
                await signInWithEmailAndPassword(auth, emailAddress, data.newPassword);

                router.push("/");
            } catch {
                setPageActionLoading(false);
                alert("An error occured while signing you in.");
                router.push("/sign-in");
                return
            }
        } catch {
            setPageActionLoading(false);
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
        pageActionLoading, 
        passwordFieldRef,
        passwordRequirementPopup,
        pageError,
        setPasswordRequirementPopup,
    }
}