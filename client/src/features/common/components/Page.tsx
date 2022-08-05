import { ReactNode } from "react"
import { SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

import {
    Heading,
    OverlaySpinner,
    RouterHelper,
    CrumbProps,
    If,
} from "."
import { isBlank } from "@app/lib"

export interface PageProps {
    title?: string
    crumbs?: CrumbProps[]
    children: ReactNode
    action?: ReactNode
    loading?: boolean
}

const defaultProps: PageProps = {
    title: null,
    crumbs: [],
    children: null,
    action: null,
    loading: false,
}

export const Page = (props: PageProps): JSX.Element => {
    const {
        title,
        crumbs,
        children,
        action,
        loading,
    } = { ...defaultProps, ...props }

    return (
        <Container sx={containerSx}>
            <OverlaySpinner open={loading} />
            <RouterHelper />
            <If test={!isBlank(title)}>
                <Heading title={title} crumbs={crumbs}>
                    <>{action}</>
                </Heading>
            </If>
            <Box sx={contentSx}>
                <>{children && children}</>
            </Box>
        </Container>
    )
}

// =============================================================================
// Styles etc.
// =============================================================================

const containerSx: SxProps = {
    display: "flex",
    flexFlow: "column nowrap",
    // justifyContent: "center", // center items vertically, in this case
    alignItems: "stretch",     // center items horizontally, in this case
    boxSizing: "border-box",
    // pt: "24px",
    // pb: `${(ThemeVariables.footerHeight * 2)}px`,
    // height: "100vh",
    // mt: {
    //     xs: "48px",
    //     sm: "20px",
    //     md: "50px",
    // },
}

const contentSx: SxProps = {
    flexGrow: 1,
    boxSizing: "border-box",
    pt: 2,
}
