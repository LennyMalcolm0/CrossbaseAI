import { User } from "firebase/auth";
import { auth } from "../Firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAsyncEffect } from "ahooks";

export async function getCurrentUser() {
    const userPromise = new Promise<User | null>((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
        });
    });

    const user = await userPromise;

    return user;
}

export const authErrorsFeedbacks = {
    invalidEmail: "Enter a valid email address.",
    invalidPassword: "Password must meet all requirements.",
    existingUser: "Email already in use.",
    invalidUser: "Enter valid login details.",
    wrongPassword: "Wrong password.",
};

// Checks if the user is signed out (used in pages where user needs to be authenticated before access is given)
export const useUnauthenticatedUserCheck = (router: AppRouterInstance) => {
    useAsyncEffect(async () => {
        const user = await getCurrentUser();

        if (!user) {
            router.push("/sign-in")
        }
    }, [router]);
}

// Checks if the user is signed in (used in authentication pages to redirect signed in users)
export const useAuthenticatedUserCheck = (router: AppRouterInstance) => {
    useAsyncEffect(async () => {
        const user = await getCurrentUser();

        if (user) {
            router.push("/")
        }
    }, [router]);
    
    return router
}
