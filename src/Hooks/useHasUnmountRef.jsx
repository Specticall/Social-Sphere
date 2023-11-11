import { useEffect, useRef } from "react";

/**
 *
 * @returns {boolean} - returns true if component has unmounted by the time of the execution
 */
export function useHasUnmountedRef() {
  const hasUnmountedRef = useRef(false);
  useEffect(() => {
    hasUnmountedRef.current = false;
    return () => {
      console.log("RUN");
      hasUnmountedRef.current = true;
    };
  }, []);
  return hasUnmountedRef;
}
