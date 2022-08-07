import merge from "lodash/merge"
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
import { sharedComponentOverrides } from "./components"

// =============================================================================
// Options
// =============================================================================

const paletteOptions: PaletteOptions = {
    ...defaultPaletteOptions,
    mode: "light",
    text: {
        primary: "#222222",
    },
}

// =============================================================================
// Overrides
// =============================================================================

// const palette = createTheme({ palette: paletteOptions }).palette

const componentOverrides: Components = {
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
                // color: "#1D1F20",
                "&.Mui-selected": {
                    color: "#1D1F20",
                    backgroundColor: "#E9EAEB",
                    "&:hover": {
                        backgroundColor: "#E9EAEB",
                    },
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
    components: merge({}, sharedComponentOverrides, componentOverrides),
    zIndex: zIndexOptions,
}

export const lightTheme: Theme = createTheme(options)
