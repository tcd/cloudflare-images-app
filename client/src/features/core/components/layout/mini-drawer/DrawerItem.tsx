import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { SxProps } from "@mui/material"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Tooltip from "@mui/material/Tooltip"

import { Selectors } from "@app/state"

export interface DrawerItemProps {
    title: string
    url: string
    matchPattern: RegExp
    icon: JSX.Element
}

export const DrawerItem = ({ title, url, icon, matchPattern }: DrawerItemProps): JSX.Element => {

    const navigate = useNavigate()
    const location = useLocation()
    const open = useSelector(Selectors.Core.drawerOpen)

    const buttonSx: SxProps = {
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
    }

    const iconWrapperSx: SxProps = {
        minWidth: 0,
        mr: open ? 3 : "auto",
        justifyContent: "center",
    }

    const active = !!location?.pathname?.match(matchPattern)

    const handleClick = () => {
        navigate(url)
    }

    return (
        <Tooltip title={title} placement="right">
            <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton sx={buttonSx} onClick={handleClick} selected={active}>
                    <ListItemIcon sx={iconWrapperSx}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </Tooltip>
    )
}
