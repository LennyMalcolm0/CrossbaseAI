import { authErrorsFeedbacks, useAuthenticatedUserCheck } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import { SignupForm } from "../models";
import { auth, googleProvider } from "@/app/Firebase";
import { setLsItem } from "@/app/utils/secureLs";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { useRef, useState } from "react";
import { useClickAway, useLockFn } from "ahooks";

export function useSignup() {
    const router = useRouter();
    useAuthenticatedUserCheck(router);
    const [loading, setLoading] = useState(false);
    const passwordFieldRef = useRef<HTMLDivElement>(null);
    const [passwordRequirementPopup, setPasswordRequirementPopup] = useState(false);

    useClickAway(() => {
        passwordRequirementPopup && setPasswordRequirementPopup(false);
    }, [passwordFieldRef]);

	const signup = async (data: SignupForm) => {
        setLoading(true);
        const errorFeedbackDisplay = document.querySelector(".error-message") as HTMLElement;
        errorFeedbackDisplay.textContent = "";

        try {
            await createUserWithEmailAndPassword(auth, data.emailAddress, data.password);
            if (!auth.currentUser) return;
            
            try {
                await sendEmailVerification(auth.currentUser);
    
                setLoading(false);
                router.push("/");
                setLsItem("@user", "true");
            } catch {
                setLoading(false);
                router.push("/");
                setLsItem("@user", "true");
            }
        } catch (error: any) {
            setLoading(false);
            const errorMessage = error.message as string;

            if (errorMessage.toLowerCase().includes("email-already-in-use")) {
                errorFeedbackDisplay.textContent = authErrorsFeedbacks.existingUser;
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
	};

    const signupWithGoogle = useLockFn(async () => {
        try {
            await signInWithPopup(auth, googleProvider);

            router.push("/");
            setLsItem("@user", "true");
        } catch (error) {
            setLoading(false);
            alert("Something went wrong. Please try again.");
        }
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmedPassword: "",
        },
        validationSchema: signupSchema,
        onSubmit: (values) => signup(values)
    });

    return { 
        formik, 
        loading, 
        passwordFieldRef,
        passwordRequirementPopup,
        signupWithGoogle,
        setPasswordRequirementPopup,
    }
}