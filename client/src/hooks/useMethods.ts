import { useQuery } from "@tanstack/react-query";
import { discover, type Method } from "@/api/discover";

export function useMethods() {
  return useQuery<Method[]>({
    queryKey: ["Method"],
    queryFn: discover,
    retry: 3,
  });
}
