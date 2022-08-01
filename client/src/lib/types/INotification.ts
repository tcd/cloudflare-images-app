import type { AlertColor } from "@mui/material"

export interface INotificationOptions {
    /** Text displayed in the notification. */
    message: string
    /**
     * The type of notification (error, success, etc.).
     *
     * @default "info"
     */
    variant?: AlertColor
    /**
     * The number of milliseconds to wait before automatically dismissing the notification.
     * With the `null` value, the notification must be dismissed manually.
     *
     * @default null
     */
    autoHideDuration?: number
}

export interface INotification {
    /** Unique identifier used to differentiate between notifications. */
    id: any
    /** Text displayed in the notification. */
    message: string
    /**
     * The type of notification (error, success, etc.).
     *
     * @default "info"
     */
    variant: AlertColor
    /**
     * @default false
     */
    dismissed: boolean
    /**
     * The number of milliseconds to wait before automatically dismissing the notification.
     * With the `null` value, the notification must be dismissed manually.
     *
     * @default null
     */
    autoHideDuration?: number
}
