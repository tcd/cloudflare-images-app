import { ReactNode } from "react"
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link"
import { To, Link as RouterLink } from "react-router-dom"

export interface LinkProps extends MuiLinkProps {
    to: To
    children?: ReactNode
}

export const Link = ({ children, ...rest }: LinkProps): JSX.Element => {
    return (
        <MuiLink component={RouterLink} {...rest}>
            <>{children && children}</>
        </MuiLink>
    )
}
