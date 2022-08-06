import { forwardRef, SyntheticEvent } from "react"
import type { SxProps } from "@mui/material"
import Alert, { AlertProps } from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

import { INotification, zIndexOptions } from "@app/lib"

export interface NotificationContentProps extends INotification {
    onCloseClick: () => void
    onClose?: (event?: SyntheticEvent) => void
    [key: string]: any
}

export const NotificationContent = forwardRef<HTMLDivElement, NotificationContentProps>(function NotificationContent(props: NotificationContentProps, ref) {

    const {
        variant: color,
        message,
        onClose,
        onCloseClick,
        dismissed:        _discard1,
        autoHideDuration: _discard2,
        ...otherProps
    } = { ...defaultProps, ...props }

    const action = (
        <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onCloseClick}
        >
            <CloseIcon fontSize="inherit" />
        </IconButton>
    )

    const alertProps: AlertProps = {
        ref: ref,
        action: action,
        onClose: onClose,
        severity: color,
        sx: alertSx,
    }

    return (
        <Alert {...alertProps} {...otherProps}>
            {message}
        </Alert>
    )
})

// =============================================================================
// Misc.
// =============================================================================

const alertSx: SxProps = {
    zIndex: zIndexOptions.notificationItem,
    width: 300,
    mt: 1,
}

const defaultProps: Partial<NotificationContentProps> = {
    onClose: (_) => { return null },
}
