import Icon from "@mdi/react"
import { IconProps } from "@mdi/react/dist/IconProps"

export interface MdiIconProps extends IconProps { }

export const MdiIcon = (props: MdiIconProps): JSX.Element => {
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
