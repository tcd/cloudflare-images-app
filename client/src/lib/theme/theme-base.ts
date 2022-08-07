import type { ThemeOptions } from "@mui/material"

import { zIndexOptions, typographyOptions } from "./shared"
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
    zIndex: zIndexOptions,
    typography: typographyOptions,
    palette: defaultPaletteOptions,
    components: sharedComponentOverrides,
}

// export const darkTheme: Theme = createTheme(options)
