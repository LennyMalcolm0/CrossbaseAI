import { authErrorsFeedbacks, useAuthenticatedUserCheck } from "@/app/utils/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { SignupForm } from "../models";
import { auth, googleProvider } from "@/app/firebase";
import { 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signInWithPopup 
} from "firebase/auth";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { useRef, useState } from "react";
import { useClickAway, useLocalStorageState, useLockFn } from "ahooks";
import { NewUserWithStore } from "@/app/models";

export function useSignup() {
    const router = useRouter();
    useAuthenticatedUserCheck(router);
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const storeDomain = searchParams.get("shop");
    const [loading, setLoading] = useState(false);
    const passwordFieldRef = useRef<HTMLDivElement>(null);
    const [passwordRequirementPopup, setPasswordRequirementPopup] = useState(false);
    const [sentVerificationLink, setSentVerificationLink] = useState(false);
    const [_, setNewUserWithStore] = useLocalStorageState<NewUserWithStore>(
        "newUserWithStore"
    );

    useClickAway(() => {
        passwordRequirementPopup && setPasswordRequirementPopup(false);
    }, [passwordFieldRef]);

	const signup = useLockFn(async (data: SignupForm) => {
        setLoading(true);
        const errorFeedbackDisplay = document.querySelector(".error-message") as HTMLElement;
        errorFeedbackDisplay.textContent = "";

        try {
            await createUserWithEmailAndPassword(auth, data.emailAddress, data.password);
            if (!auth.currentUser) return;
            
            await sendEmailVerification(auth.currentUser);

            setSentVerificationLink(true);
            setNewUserWithStore({
                firstName: data.firstName,
                lastName: data.lastName,
                storeDomain: storeDomain || undefined,
                type: type || undefined
            });
        } catch (error: any) {
            setLoading(false);
            const errorMessage = error.message as string;

            if (errorMessage.toLowerCase().includes("email-already-in-use")) {
                errorFeedbackDisplay.textContent = authErrorsFeedbacks.existingUser;
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
	});

    const signupWithGoogle = useLockFn(async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setLoading(true);

            if (type && storeDomain) {
                router.push(`/integrations?shop=${storeDomain}&type=${type}`);
            } else {
                router.push("/");
            }
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
        sentVerificationLink,
        type,
        storeDomain,
        signupWithGoogle,
        setPasswordRequirementPopup,
    }
}