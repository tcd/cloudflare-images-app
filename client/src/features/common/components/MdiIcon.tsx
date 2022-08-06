import Icon from "@mdi/react"
import { IconProps } from "@mdi/react/dist/IconProps"
import { useTheme } from "@mui/material"

export interface MdiIconProps extends IconProps { }

export const MdiIcon = (props: MdiIconProps): JSX.Element => {

    const theme = useTheme()

    if (!props?.color) {
        props = {
            ...props,
            color: theme.palette.primary.main,
        }
    }

    return (
        <Icon
            {...props}
            // path={path}
            // title="User Profile"
            size={1}
            // horizontal
            // vertical
            // rotate={90}
            // color="red"
            // spin
        />
    )
}
