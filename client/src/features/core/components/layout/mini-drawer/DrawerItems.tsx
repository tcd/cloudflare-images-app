import PhotoFilterIcon from "@mui/icons-material/PhotoFilter"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import SettingsIcon from "@mui/icons-material/Settings"

import { DrawerItem, DrawerItemProps } from "."

const drawerItemProps: DrawerItemProps[] = [
    {
        text: "Images",
        url: "/images",
        icon: <PhotoLibraryIcon />,
        matchPattern: /(^\/$)|(^\/images$)/,
    },
    {
        text: "Variants",
        url: "/variants",
        icon: <PhotoFilterIcon />,
        matchPattern: /(^\/variants(\/create)?$)/,
    },
    {
        text: "Settings",
        url: "/settings",
        icon: <SettingsIcon />,
        matchPattern: /(^\/settings$)/,
    },
]

// https://mui.com/material-ui/react-drawer/#mini-variant-drawer
export const DrawerItems = (_props: unknown): JSX.Element => {

    const $items = drawerItemProps.map(x => <DrawerItem key={x.text} {...x}/>)

    return (
        <>
            {$items}
        </>
    )
}
