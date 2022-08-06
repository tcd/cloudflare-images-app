
import { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import Box, { BoxProps } from "@mui/material/Box"

// import { CloudflareThemes } from "@app/lib"
import { AppFooter } from "./AppFooter"
import { AppHeader } from "./AppHeader"

export interface LayoutProps {
    children: ReactNode
}

export const Layout = (): JSX.Element => {
    return (
        <Box {...containerProps}>
            <AppHeader />
            <Box component="main" {...mainProps}>
                <Outlet />
            </Box>
            <Box {...spacerProps}/>
            <AppFooter />
        </Box>
    )
}

// =============================================================================

const containerProps: BoxProps = {
    sx: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexFlow: "column nowrap",
        overflow: "hidden !important",
        alignItems: "stretch",
    },
}

const mainProps: BoxProps = {
    sx: {
        overflowY: "auto",
        flexGrow: 1,
    },
}

const spacerProps: BoxProps = {
    flexGrow: 0,
    flexShrink: 1,
    id: "cf__spacer",
    sx: {
        content: `"\u200b"`,
        boxSizing: "border-box",
        display: {
            xs: "block",
            md: "none",
        },
        mt: {
            xs: 7,
            md: 0,
        },
    },
}
