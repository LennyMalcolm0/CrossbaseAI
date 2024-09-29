import * as yup from "yup";

export const signupSchema = yup.object().shape({
    // firstName: yup.string().trim().required("First name is required"),
    // lastName: yup.string().trim().required("Last name is required"),
    emailAddress: yup.string().trim().lowercase()
        .email("Invalid email address").required("Email address is required"),
    password: yup.string().trim()
        .min(8, "Password must be at least 8 characters")
        // .max(32, "Password must not exceed 32 characters")
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).+$/,
        //     "Password must contain at least one capital letter, one small letter, one number, and one special character"
        // )
        .required("Password is required"),
    confirmedPassword: yup.string().trim()
        .oneOf([yup.ref('password'), undefined], "Passwords must match")
        .required("Confirm new password")
});

export const signinSchema = yup.object().shape({
    emailAddress: yup.string().trim().lowercase()
        .email("Invalid email address")
        .required("Enter email address"),
    password: yup.string().trim().required("Enter password"),
});

export const resetPasswordSchema = yup.object().shape({
    emailAddress: yup.string().trim().lowercase()
        .email("Invalid email address")
        .required("Enter email address"),
});

export const setNewPasswordSchema = yup.object().shape({
    newPassword: yup.string().trim()
        .min(8, "Password must be at least 8 characters")
        // .max(32, "Password must not exceed 32 characters")
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).+$/,
        //     "Password must contain at least one capital letter, one small letter, one number, and one special character"
        // )
        .required("Enter new password"),
    confirmedPassword: yup.string().trim()
        .oneOf([yup.ref('newPassword'), undefined], "Passwords must match")
        .required("Confirm new password")
});