import type { Components } from "@mui/material"

export const sharedComponentOverrides: Components = {
    MuiTextField: {
        defaultProps: {
            variant: "standard",
            margin: "dense",
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: "blue",
            },
        },
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                "&.Mui-selected .MuiListItemIcon-root .MuiSvgIcon-root": {
                    color: "#F38020",
                },
            },
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                "&.Mui-disabled": {
                    ".MuiSvgIcon-root": {
                        color: "#ffffff4d",
                    },
                },
            },
        },
    },
}
