import { ReactNode } from "react"
import { SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"

import { Crumb, CrumbProps, If } from "@feature/common"

interface HeadingProps {
    title: string
    children?: ReactNode
    crumbs?: CrumbProps[]
}

const defaultProps: Partial<HeadingProps> = {
    crumbs: [],
}

export const Heading = (props: HeadingProps): JSX.Element => {
    const {
        title,
        children,
        crumbs,
    } = { ...defaultProps, ...props }

    if (!title) {
        return null
    }

    const crumbsTest = ((crumbs?.length ?? 0) > 0)

    return (
        <Box sx={containerSx}>
            <Box sx={rowSx}>
                <Typography variant="h4" gutterBottom>
                    {props.title}
                </Typography>
                <Box sx={childrenContainerSx}>
                    <>{children && children}</>
                </Box>
            </Box>
            <If test={crumbsTest}>
                <Box sx={breadcrumbRowSx}>
                    <Breadcrumbs>
                        <>
                            {crumbs?.map(crumb => <Crumb key={crumb.title} {...crumb } />)}
                        </>
                    </Breadcrumbs>
                </Box>
            </If>
            <Divider sx={dividerSx} />
        </Box>
    )
}

// =============================================================================
// Styles
// =============================================================================

const containerSx: SxProps = {
    display: "flex",
    flexFlow: "column nowrap",
    boxSizing: "border-box",
}

const rowSx: SxProps = {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
}

const breadcrumbRowSx: SxProps = {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "start",
}

const childrenContainerSx: SxProps = {
    justifySelf: "stretch",
    display: "flex",
    alignItems: "center",
    mr: 2,
}

const dividerSx: SxProps = {
    boxSizing: "border-box",
    mt: 1,
    mb: 5,
}
