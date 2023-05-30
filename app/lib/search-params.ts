import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useUpdateSearchParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.length === 0) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      if (searchParams.toString() === params.toString()) {
        return;
      }
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname]
  );

  return updateSearchParams;
}
