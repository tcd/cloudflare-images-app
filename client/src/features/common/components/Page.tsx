import type { ReactNode } from "react"
import type { SxProps } from "@mui/material"
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
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    boxSizing: "border-box",
    mt: 3,
}

const contentSx: SxProps = {
    flexGrow: 1,
    boxSizing: "border-box",
    pt: 2,
    pb: {
        xs: "16px",
        sm: "24px",
    },
}
