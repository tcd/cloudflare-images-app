import { ReactNode } from "react"
import {
    CardProps as MuiCardProps,
    SxProps,
    TypographyProps,
} from "@mui/material"
import Box from "@mui/material/Box"
import MuiCard from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

export interface CardProps {
    title?: string
    children: ReactNode
    CardProps?: MuiCardProps
    sx?: SxProps
}

const defaultProps: Partial<CardProps> = {
    title: null,
    children: null,
    CardProps: {},
    sx: {},
}

export const Card = (props: CardProps): JSX.Element => {
    props = { ...defaultProps, ...props }

    const {
        title,
        children,
        sx,
        CardProps,
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

    return (
        <MuiCard sx={sx} {...CardProps}>
            <CardContent>
                {$title}
                <Box>
                    <>{children && children}</>
                </Box>
            </CardContent>
        </MuiCard>
    )
}
