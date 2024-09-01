import { auth } from "@/app/utils/firebase";
import { useAuthenticatedUserCheck } from "@/app/utils/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ResetPasswordForm } from "../models";
import { resetPasswordSchema } from "../schemas";
import { useState } from "react";

export function useResetPassword() {
    const router = useRouter();
    useAuthenticatedUserCheck(router);
    const [loading, setLoading] = useState(false);

    const handlePasswordResetEmail = async (data: ResetPasswordForm) => {
        setLoading(true);
        const errorFeedbackDisplay = document.querySelector(".error-message") as HTMLElement;

        try {
            await sendPasswordResetEmail(auth, data.emailAddress);
            
            setLoading(false);
            alert("Success! Check your inbox for the reset password link");
            router.push("/sign-in");
        } catch {
            setLoading(false);
            errorFeedbackDisplay.textContent = "No account matches this email";
        }
    };

    const formik = useFormik({
        initialValues: {
            emailAddress: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: (values) => handlePasswordResetEmail(values),
    });

    return { formik, loading }
}