import { useMediaQuery, useTheme } from "@mui/material";
import { NAVBAR_HEIGHT } from "../components/sections/Navbar";

export function useNavbarOffset() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Keep section offsets aligned with the sticky navbar at each breakpoint.
  const navbarHeight = isDesktop ? NAVBAR_HEIGHT.desktop : NAVBAR_HEIGHT.mobile;
  const scrollMarginTop = navbarHeight + 16;

  return { navbarHeight, scrollMarginTop, isDesktop };
}
