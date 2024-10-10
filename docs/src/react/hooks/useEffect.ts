import { useEffect, useRef } from "react";

export function useOneEffect(effect: () => void | (() => void | undefined)) {
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      return effect();
    }
  });
}
