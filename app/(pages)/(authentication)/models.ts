export type SignupForm = {
    firstName: string;
    lastName: string;
    emailAddress: string; 
    password: string;
    confirmedPassword: string;
}

export type SigninForm = {
    emailAddress: string; 
    password: string;
}

export type ResetPasswordForm = Omit<SigninForm, "password">

export type SetNewPasswordForm = {
    newPassword: string;
    confirmedPassword: string;
}