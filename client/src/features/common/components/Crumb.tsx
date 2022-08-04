import type { To } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Breadcrumbs from "@mui/material/Breadcrumbs"

import { Link } from "@feature/common"

export interface CrumbProps {
    title: string
    to?: To
    active?: boolean
    last?: boolean
}

const defaultProps: Partial<CrumbProps> = {
    title: undefined,
    to: undefined,
    active: false,
    last: false,
}

export const Crumb = (props: CrumbProps): JSX.Element => {

    const {
        title,
        to,
        active,
        last,
    } = { ...defaultProps, ...props }

    if (last) {
        return (
            <Typography color="text.primary">{title}</Typography>
        )
    }

    return (
        <Link
            to={to}
            underline="hover"
            color="inherit"
        >
            {title}
        </Link>
    )
}
