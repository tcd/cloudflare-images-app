import merge from "lodash/merge"
import {
    createTheme,
    Components,
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
    mode: "dark",
    background: {
        default: "#1D1F20",
    },
    text: {
        primary: "#D5D7D8",
    },
}

// =============================================================================
// Overrides
// =============================================================================

const componentOverrides: Components = {
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: "#242628",
            },
        },
    },
    MuiToolbar: {
        styleOverrides: {
            root: {
                backgroundColor: "#242628",
                borderBottom: "1px solid #2F3133",
                "& .MuiSvgIcon-root": {
                    color: "#FFFFFF",
                },
            },
        },
    },
    MuiDrawer: {
        styleOverrides: {
            root: {
                "& .MuiPaper-root": {
                    color: "#FFFFFF",
                    backgroundColor: "#1D1F20",
                },
            },
        },
    },
    // MuiBottomNavigationAction: {
    //     styleOverrides: {
    //         root: {
    //             "&.Mui-selected": {
    //                 color: "red",
    //             },
    //         },
    //         selected: {
    //             backgroundColor: "red",
    //         },
    //     },
    // },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                "&.Mui-selected": {
                    color: "#FBA056",
                    backgroundColor: "#2E2720",
                    "&:hover": {
                        backgroundColor: "#2E2720",
                    },
                },
                "&:hover": {
                    backgroundColor: "#2E2720",
                },
            },
        },
    },
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

export const darkTheme: Theme = createTheme(options)
