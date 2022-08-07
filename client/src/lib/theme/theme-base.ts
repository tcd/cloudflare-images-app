import type { ThemeOptions } from "@mui/material"

import { zIndexOptions } from "./z-index"
import { defaultPaletteOptions } from "./palette"
import { sharedComponentOverrides } from "./components"

// =============================================================================
// Theme
// =============================================================================

/**
 * ## Material UI Docs:
 *
 * - [Palette](https://mui.com/customization/palette/)
 * - [Components](https://mui.com/customization/theme-components/)
 */
export const baseThemeOptions: ThemeOptions = {
    palette: defaultPaletteOptions,
    components: sharedComponentOverrides,
    zIndex: zIndexOptions,
}

// export const darkTheme: Theme = createTheme(options)
