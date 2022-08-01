import { RootState } from "@app/state"

const _selectSlice = (rootState: RootState) => rootState?.Notifications
const selectNotifications = (rootState: RootState) => _selectSlice(rootState)?.notifications ?? []

// =============================================================================

export const NotificationsSelectors = {
    notifications: selectNotifications,
}
