import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Custom hook for managing search parameters */ 
function useUpdateSearchParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

  const updateSearchParams = (params: any) => {
    const currentSearchParams = new URLSearchParams(searchParams);

    Object.keys(params).forEach((key) => {
        const value = params[key];
        currentSearchParams.set(key, value);
    });

    const newUrl = `${pathname}?${currentSearchParams.toString()}`;

    router.push(newUrl);
  };

  return { searchParams, updateSearchParams };
}

export default useUpdateSearchParams;
