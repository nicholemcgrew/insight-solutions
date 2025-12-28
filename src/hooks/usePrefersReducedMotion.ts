import { useMemo } from "react";

function prefersReducedMotion() {
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

export function usePrefersReducedMotion() {
  // Cache the user preference once per mount (matches expected behavior for this UI).
  return useMemo(() => prefersReducedMotion(), []);
}
