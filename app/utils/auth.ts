import { User } from "firebase/auth";
import { auth } from "../firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { clearCache, useAsyncEffect, useLockFn } from "ahooks";
import router from "next/router";
import useActiveStore from "../(pages)/(main-app)/hooks/useActiveStore";

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

export function useLogoutUser() {
    const { clearStore } = useActiveStore();

    const logoutUser = useLockFn(async () => {
        try {
            await auth.signOut();

            clearCache("");
            clearStore();

            router.push("/sign-in");
        } catch(error) {
            console.log(error)
            alert("Something went wrong. Please try again.");
        }
    })

    return logoutUser;
};

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
