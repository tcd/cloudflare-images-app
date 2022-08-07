import type { ReactNode } from "react"
import type {
    SxProps,
    CardProps as MuiCardProps,
    TypographyProps,
} from "@mui/material"
import merge from "lodash/merge"
import Box from "@mui/material/Box"
import MuiCard from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

import { If } from "@feature/common"

export interface CardProps {
    title?: string
    children: ReactNode
    CardProps?: MuiCardProps
    sx?: SxProps
    footer?: ReactNode
}

export const Card = (props: CardProps): JSX.Element => {
    const mergedProps = merge({}, defaultProps, props)
    const {
        title,
        children,
        sx,
        CardProps,
        footer,
    // } = merge({}, defaultProps, props)
    } = { ...defaultProps, ...props }
    // } = mergedProps

    return (
        <MuiCard sx={sx} {...CardProps}>
            <CardContent>
                <If test={!!title}>
                    <Typography {...titleProps}>
                        {title}
                    </Typography>
                </If>
                {/* {!!title &&
                    <Typography {...titleProps} key="">
                        {title}
                    </Typography>
                } */}
                <Box>
                    <>{children && children}</>
                </Box>
                {footer && footer}
            </CardContent>
        </MuiCard>
    )
}

// =============================================================================
// Helpers
// =============================================================================

const defaultProps: CardProps = {
    title: null,
    children: null,
    CardProps: {},
    sx: {
        display: "flex",
        flexFlow: "column nowrap",
    },
    footer: null,
}

const titleProps: TypographyProps = {
    gutterBottom: true,
    variant: "h4",
}
