import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const getHeaderOffset = () => {
  // MUI AppBar typically renders inside a <header>
  const header = document.querySelector("header");
  const headerH = header?.getBoundingClientRect().height ?? 0;

  // Extra breathing room so the section title isn't glued to the AppBar
  const extra = 12;

  return Math.round(headerH + extra);
};

const ScrollToHash = () => {
  const { hash, pathname, search } = useLocation();

  useEffect(() => {
    // If there's no hash, always start at the top of the new route
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    // Only handle hashes that exist on the current rendered page
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) {
      // Hash exists but target element is not on this route
      // Avoid leaving the user at an old scroll position
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    // Defer until after route render/layout settles
    requestAnimationFrame(() => {
      const offset = getHeaderOffset();
      const y = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: Math.max(y, 0),
        behavior: "smooth",
      });

      // Optional: ensure keyboard users land in the section context
      // el.focus?.({ preventScroll: true });
    });
  }, [hash, pathname, search]);

  return null;
};

export default ScrollToHash;
