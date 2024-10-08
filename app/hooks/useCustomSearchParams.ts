import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Custom hook for managing search parameters */ 
function useCustomSearchParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateSearchParams = (params: any, clean = false) => {
        const currentSearchParams = new URLSearchParams(
            !clean ? searchParams as unknown as URLSearchParams : {}
        );

        if (Object.keys(params).length === 0) {
            return router.push(pathname);
        }

        Object.keys(params).forEach((key) => {
            const value = params[key];
            currentSearchParams.set(key, value);
        });

        const newUrl = `${pathname}?${currentSearchParams.toString()}`;

        router.push(newUrl);
    };

    return { searchParams, updateSearchParams };
}

export default useCustomSearchParams;
