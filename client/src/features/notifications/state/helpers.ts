import { INotification, INotificationOptions } from "@app/lib"

export const createNotification = (options: INotificationOptions): INotification => {
    return {
        id:               new Date().getTime() + Math.random(),
        dismissed:        false,
        message:          options.message,
        variant:          options?.variant ?? "info",
        autoHideDuration: options?.autoHideDuration ?? 4_000,
    }
}
