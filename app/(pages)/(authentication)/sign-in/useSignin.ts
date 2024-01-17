import { auth, googleProvider } from "@/app/firebase";
import { useAuthenticatedUserCheck, authErrorsFeedbacks } from "@/app/utils/auth";
import { useLockFn } from "ahooks";
import { 
    signInWithEmailAndPassword, 
    AuthErrorCodes, 
    signInWithPopup 
} from "firebase/auth";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SigninForm } from "../models";
import { signinSchema } from "../schemas";

export function useSignin() {
    const router = useRouter();
    useAuthenticatedUserCheck(router);
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const storeDomain = searchParams.get("shop");
    const newStore = searchParams.get("new");
    const [loading, setLoading] = useState(false);

    const navigateToApp = () => {
        if (type && storeDomain && newStore) {
            router.push(`/integrations?shop=${storeDomain}&type=${type}`);
            return
        }

        router.push("/");
    };

	const signIn = useLockFn(async (data: SigninForm) => {
        setLoading(true);
        
        const errorFeedbackDisplay = document.querySelectorAll(".error-message") as NodeListOf<HTMLElement>;
        errorFeedbackDisplay.forEach(error => error.textContent = "");

        try {
            await signInWithEmailAndPassword(auth, data.emailAddress, data.password);

            navigateToApp();
        } catch (error: any) {
            setLoading(false);
            const errorMessage = error.message as string;
            console.log(errorMessage)
            
            if (errorMessage.toLowerCase().includes("password")) {
                errorFeedbackDisplay[1].textContent = authErrorsFeedbacks.wrongPassword;
            } else if (errorMessage.includes(AuthErrorCodes.INVALID_EMAIL)) {
                errorFeedbackDisplay[0].textContent = authErrorsFeedbacks.invalidUser;
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
	}); 
    
    const signinWithGoogle = useLockFn(async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setLoading(true);
            navigateToApp();
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

    return { 
        formik, 
        loading, 
        type,
        storeDomain,
        signinWithGoogle 
    }
}