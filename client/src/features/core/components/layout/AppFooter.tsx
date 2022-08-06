import { useLocation, useNavigate } from "react-router-dom"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Paper, { PaperProps} from "@mui/material/Paper"

import { NavItemProps } from "@app/lib"
import { navItems } from "./nav-items"

// =============================================================================

const paperProps: PaperProps = {
    elevation: 3,
    sx: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: {
            xs: "block",
            sm: "none",
        },
    },
}

// =============================================================================

export const AppFooter = (_props: unknown): JSX.Element => {

    const $actions = navItems.map((x) => <FooterAction key={x.title} {...x}/>)

    return (
        <Paper {...paperProps}>
            <BottomNavigation showLabels={true}>
                {$actions}
            </BottomNavigation>
        </Paper>
    )
}

// =============================================================================

export const FooterAction = (props: NavItemProps): JSX.Element => {

    const {
        title,
        url,
        matchPattern,
        icon,
    } = props

    const navigate = useNavigate()
    const location = useLocation()

    // const active = !!location?.pathname?.match(matchPattern)
    // const className = active ? ".Mui-selected" : ""

    const handleClick = () => { navigate(url) }

    return (
        <BottomNavigationAction
            label={title}
            icon={icon}
            value={title}
            showLabel={true}
            onClick={handleClick}
        />
    )
}

// =============================================================================
