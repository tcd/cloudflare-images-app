import {
    createTheme,
    Components,
    CSSInterpolation,
    PaletteOptions,
    Theme,
    ThemeOptions,
} from "@mui/material"

import { zIndexOptions } from "./z-index"
import { defaultPaletteOptions } from "./palette"

// =============================================================================
// Options
// =============================================================================

const paletteOptions: PaletteOptions = {
    ...defaultPaletteOptions,
    mode: "light",
}

// =============================================================================
// Overrides
// =============================================================================

// const palette = createTheme({ palette: paletteOptions }).palette

const componentOverrides: Components = {
    MuiTextField: {
        defaultProps: {
            variant: "standard",
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: "#F8FBFB",
            },
        },
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                color: "#1D1F20",
                "&.Mui-selected": {
                    color: "#1D1F20",
                    backgroundColor: "#E9EAEB",
                    "&:hover": {
                        backgroundColor: "#E9EAEB",
                    },
                },
                "&.Mui-selected .MuiListItemIcon-root .MuiSvgIcon-root": {
                    color: "#f38020",
                },
                "&:hover": {
                    backgroundColor: "#E9EAEB",
                },
            },
        },
    },
    MuiToolbar: {
        styleOverrides: {
            root: {
                backgroundColor: "#FFFFFF",
                borderBottom: "1px solid #e1e1e1",
                "& .MuiSvgIcon-root": {
                    color: "#4E5255",
                },
            },
        },
    },
    MuiDrawer: {
        styleOverrides: {
            root: {
                "& .MuiPaper-root": {
                    backgroundColor: "#F8FBFB",
                },
            },
        },
    },
    MuiTypography: {
        styleOverrides: {
            h1: { color: "#222222" },
            h2: { color: "#222222" },
            h3: { color: "#222222" },
            h4: { color: "#222222" },
            h5: { color: "#222222" },
            h6: { color: "#222222" },
        },
    },
    // MuiButton: {
    //     defaultProps: {
    //         variant: "outlined",
    //     },
    //     styleOverrides: {
    //         root: ({ ownerState }): CSSInterpolation => {
    //             let styles: CSSInterpolation = {}
    //             if (ownerState?.component == "a" && ownerState.color == "primary" && ownerState.variant == "contained") {
    //                 styles = {
    //                     ...styles,
    //                     ":hover": {
    //                         color: palette.secondary.main,
    //                     },
    //                 }
    //             }
    //             return styles
    //         },
    //         // outlined: {
    //         //     color: _themePalette.primary.main,
    //         //     borderColor: _themePalette.primary.main,
    //         // },
    //         // containedPrimary: {
    //         //     color: "white",
    //         //     backgroundColor: _themePalette.primary.main,
    //         // },
    //     },
    // },
}

// =============================================================================
// Theme
// =============================================================================

/**
 * ## Material UI Docs:
 *
 * - [Palette](https://mui.com/customization/palette/)
 * - [Components](https://mui.com/customization/theme-components/)
 */
const options: ThemeOptions = {
    palette: paletteOptions,
    components: componentOverrides,
    zIndex: zIndexOptions,
}

export const lightTheme: Theme = createTheme(options)
