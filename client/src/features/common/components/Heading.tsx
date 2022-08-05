import { ReactNode } from "react"
import { SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import Grid, { GridProps } from "@mui/material/Grid"
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
            {/* <Box sx={rowSx}>
                <Typography variant="h4" gutterBottom>
                    {props.title}
                </Typography>
                <Box sx={childrenContainerSx}>
                    <>{children && children}</>
                </Box>
            </Box> */}
            <Grid {...containerProps}>
                <Grid {...leftColumnProps}>
                    <Typography variant="h4" gutterBottom>
                        {props.title}
                    </Typography>
                </Grid>
                <Grid {...rightColumnProps}>
                    <Box sx={childrenContainerSx}>
                        <>{children && children}</>
                    </Box>
                </Grid>
            </Grid>
            <If test={crumbsTest}>
                <Grid item xs={2}>
                    <Box sx={breadcrumbRowSx}>
                        <Breadcrumbs>
                            {crumbs?.map(crumb => <Crumb key={crumb.title} {...crumb } />)}
                        </Breadcrumbs>
                    </Box>
                </Grid>
            </If>
            <Divider sx={dividerSx} />
        </Box>
    )
}

// =============================================================================
// Styles
// =============================================================================

const containerProps: GridProps = {
    container: true,
    direction: "row",
    columns: 2,
    sx: {
        boxSizing: "border-box",
    },
}


const sharedColumnProps: GridProps = {
    item: true,
    xs: 2,
    md: 1,
}

const leftColumnProps: GridProps = {
    ...sharedColumnProps,
    display: "flex",
    justifyContent: "flex-start",
}

const rightColumnProps: GridProps = {
    ...sharedColumnProps,
    display: "flex",
    // justifyContent: "flex-end",
    justifyContent: {
        xs: "flex-start",
        md: "flex-end",
    },
}

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
