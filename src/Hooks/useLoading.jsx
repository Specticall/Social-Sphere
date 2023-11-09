import { useEffect, useState } from "react";

export function useLoading(pendingData, initial) {
  const [isLoading, setIsLoading] = useState(initial);

  useEffect(() => {
    if (!pendingData) return;
    setIsLoading(false);
  }, [pendingData]);

  return { isLoading };
}
