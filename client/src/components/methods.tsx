import { useMethods } from "@/hooks/useMethods";
import { Suspense, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";

export default function Methods() {
  const { data, isError, isLoading, isSuccess, error } = useMethods();
  return (
    <Suspense fallback={<Spinner />}>
      <div>content</div>
    </Suspense>
  );
}
