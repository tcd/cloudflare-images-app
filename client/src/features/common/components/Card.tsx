import { ReactNode } from "react"
import type { SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography, { TypographyProps } from "@mui/material/Typography"

export interface CardProps {
    title?: string
    children: ReactNode
    CardProps?: MuiCardProps
    sx?: SxProps
    footer?: ReactNode
}

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

export const Card = (props: CardProps): JSX.Element => {
    props = { ...defaultProps, ...props }

    const {
        title,
        children,
        sx,
        CardProps,
        footer,
    } = props

    const titleProps: TypographyProps = {
        gutterBottom: true,
        variant: "h4",
    }

    let $title: JSX.Element = null
    if (title) {
        $title = (
            <Typography {...titleProps}>
                {title}
            </Typography>
        )
    }
    let $footer: JSX.Element = null
    if (footer) {
        $footer = (
            <>
                {footer}
            </>
        )
    }

    return (
        <MuiCard sx={sx} {...CardProps}>
            <CardContent>
                {$title}
                <Box>
                    <>{children && children}</>
                </Box>
                {$footer}
            </CardContent>
        </MuiCard>
    )
}
