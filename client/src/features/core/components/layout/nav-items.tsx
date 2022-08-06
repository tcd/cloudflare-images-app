import PhotoFilterIcon from "@mui/icons-material/PhotoFilter"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import SettingsIcon from "@mui/icons-material/Settings"

import { NavItemProps } from "@app/lib"

// =============================================================================

export const navItems: NavItemProps[] = [
    {
        title: "Images",
        url: "/images",
        icon: <PhotoLibraryIcon />,
        matchPattern: /(^\/$)|(^\/images$)/,
    },
    {
        title: "Variants",
        url: "/variants",
        icon: <PhotoFilterIcon />,
        matchPattern: /(^\/variants(\/create)?$)/,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: <SettingsIcon />,
        matchPattern: /(^\/settings$)/,
    },
]
