import { PaletteOptions } from "@mui/material"

import { CLOUDFLARE_COLORS } from "./colors"

// =============================================================================
// Options
// =============================================================================

export const defaultPaletteOptions: PaletteOptions = {
    primary: {
        main:  CLOUDFLARE_COLORS.orange,
        light: CLOUDFLARE_COLORS.logo.lightOrange,
        dark:  CLOUDFLARE_COLORS.logo.darkOrange,
    },
    secondary: {
        main:  "#1372ec",
        light: "#399ffe",
        dark:  "#1a50ad",
    },
    success: {
        main: CLOUDFLARE_COLORS.green,
    },
}
