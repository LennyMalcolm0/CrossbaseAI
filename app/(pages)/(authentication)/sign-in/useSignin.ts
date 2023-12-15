import { auth, googleProvider } from "@/app/Firebase";
import { useAuthenticatedUserCheck, authErrorsFeedbacks } from "@/app/utils/auth";
import { setLsItem } from "@/app/utils/secureLs";
import { useLockFn } from "ahooks";
import { signInWithEmailAndPassword, AuthErrorCodes, signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SigninForm } from "../models";
import { signinSchema } from "../schemas";

export function useSignin() {
    const router = useRouter();
    useAuthenticatedUserCheck(router);
    const [loading, setLoading] = useState(false);

	const signIn = async (data: SigninForm) => {
        setLoading(true);
        
        const errorFeedbackDisplay = document.querySelectorAll(".error-message") as NodeListOf<HTMLElement>;
        errorFeedbackDisplay.forEach(error => error.textContent = "");

        try {
            await signInWithEmailAndPassword(auth, data.emailAddress, data.password);
            
            router.push("/");
            setLsItem("@user", "true");
        } catch (error: any) {
            setLoading(false);
            const errorMessage = error.message as string;
            console.log(errorMessage)
            console.log(data)
            
            if (errorMessage.toLowerCase().includes("password")) {
                errorFeedbackDisplay[1].textContent = authErrorsFeedbacks.wrongPassword;
            } else if (errorMessage.includes(AuthErrorCodes.INVALID_EMAIL)) {
                errorFeedbackDisplay[0].textContent = authErrorsFeedbacks.invalidUser;
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
	}; 
    
    const signinWithGoogle = useLockFn(async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setLoading(true);
            router.push("/");
            setLsItem("@user", "true");
        } catch {
            setLoading(false);
            alert("Something went wrong. Please try again.");
        }
    });

    const formik = useFormik({
        initialValues: {
            emailAddress: "",
            password: "",
        },
        validationSchema: signinSchema,
        onSubmit: (values) => signIn(values)
    });

    return { formik, loading, signinWithGoogle }
}