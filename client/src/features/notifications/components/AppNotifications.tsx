import { useSelector } from "react-redux"
import type { SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import {
    CSSTransition,
    TransitionGroup,
} from "react-transition-group"

import { zIndexOptions } from "@app/lib"
import { Selectors } from "@app/state"
import { Notification } from "."

const boxSx: SxProps = {
    position: "absolute",
    bottom: 12,
    left: 24,
    zIndex: zIndexOptions.notificationContainer,
}

/**
 * Container element that displays all app notifications.
 */
export const AppNotifications = (_props: unknown): JSX.Element => {

    const notifications = useSelector(Selectors.Notifications.notifications)

    let elements
    if ((notifications?.length ?? 0) > 0) {
        elements = notifications.map((x) => {
            return (
                <CSSTransition
                    key={x.id}
                    timeout={500}
                >
                    <Notification {...x} />
                </CSSTransition>
            )
        })
    }

    return (
        <Box sx={boxSx}>
            <TransitionGroup>
                {elements}
            </TransitionGroup>
        </Box>
    )
}
