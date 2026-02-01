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
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // Only handle same-page hashes (keeps behavior predictable)
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;

    // Defer until after route render/layout settles
    requestAnimationFrame(() => {
      const offset = getHeaderOffset();
      const y = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      // Optional: ensure keyboard users land in the section context
      // el.focus?.({ preventScroll: true });
    });
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;
