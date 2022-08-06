import { DrawerItem } from "."
import { navItems } from "../nav-items"

// https://mui.com/material-ui/react-drawer/#mini-variant-drawer
export const DrawerItems = (_props: unknown): JSX.Element => {
    const $items = navItems.map(x => <DrawerItem key={x.title} {...x}/>)
    return (
        <>
            {$items}
        </>
    )
}
