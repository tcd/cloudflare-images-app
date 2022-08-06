import { useLocation, useNavigate } from "react-router"
import AppBar from "@mui/material/AppBar"
import Box, { BoxProps } from "@mui/material/Box"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"

import { NavItemProps } from "@app/lib"
import { Logo } from "@feature/common"
import { navItems } from "./nav-items"

// =============================================================================

const containerProps: BoxProps = {
    sx: {
        display: {
            xs: "none",
            md: "block",
        },
    },
}

// =============================================================================

export const AppHeader = (_props: unknown): JSX.Element => {

    const $actions = navItems.map((x) => <HeaderAction key={x.title} {...x}/>)

    return (
        <Box {...containerProps}>
            <AppBar position="static">
                <Toolbar>
                    <Logo sx={{ height: "50px", mr: 3 }}/>
                    {$actions}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

// =============================================================================

const HeaderAction = (props: NavItemProps): JSX.Element => {

    const {
        title,
        url,
        matchPattern,
    } = props

    const navigate = useNavigate()
    const location = useLocation()

    const active = location?.pathname?.match(matchPattern)
    const buttonSx = {
        my: 2,
        color: active ? "primary" : "white",
        display: "block",
    }

    const handleClick = () => { navigate(url) }

    return (
        <Button
            onClick={handleClick}
            sx={buttonSx}
        >
            {title}
        </Button>
    )
}
