import { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import Box, { BoxProps } from "@mui/material/Box"

import { AppFooter } from "./AppFooter"

export interface LayoutProps {
    children: ReactNode
}

export const Layout = (): JSX.Element => {
    return (
        <Box {...containerProps}>
            {/* <div>example</div> */}
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
        // pb: 10,
        // pt: 7,
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
        mb: {
            xs: 7,
            sm: 0,
        },
        pb: {
            xs: 0,
            sm: 10,
            // md: 10,
        },
        // backgroundColor: {
        //     xs: "red",
        //     sm: "orange",
        //     md: "yellow",
        //     lg: "green",
        //     xl: "blue",
        // },
        // pb: 20,
        // "&::after": {
        //     content: `"\u200b"`,
        //     height: "200px",
        //     // visibility: "hidden",
        // },
    },
}

const spacerProps: BoxProps = {
    id: "cf__spacer",
    sx: {
        content: `"\u200b"`,
        // height: "100px",
        height: {
            xs: "24px",
            sm: "100px",
        },
        // mb: {
        //     xs: 7,
        //     sm: 0,
        // },
    },
}
