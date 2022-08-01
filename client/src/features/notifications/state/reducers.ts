/* eslint-disable semi */
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import {
    updateArray,
    INotificationOptions,
    parseError,
} from "@app/lib"
import {
    NotificationsState,
    INITIAL_NOTIFICATIONS_STATE,
} from "./state"
import { createNotification } from "./helpers"
import { CoreActions } from "@feature/core"
import { ImagesActions } from "@feature/images"
import { VariantsActions } from "@feature/variants";

// const notify = (state: NotificationsState, options: INotificationOptions): NotificationsState => {
//     state.notifications.push(createNotification(options));
//     return state;
// };

const notifySuccess = (state: NotificationsState, message: string): NotificationsState => {
    state.notifications.push(createNotification({
        variant: "success",
        message: message,
    }));
    return state;
};

const notifyError = (state: NotificationsState, error: any, message: string): NotificationsState => {
    const parsed = parseError(error)
    if (parsed !== "Error") {
        message = parsed
    }
    state.notifications.push(createNotification({
        variant: "error",
        message: message,
    }));
    return state;
};

export const reducers = {
    /**
     * Remove all notifications from state.
     */
    clearAllNotifications: (state: NotificationsState) => {
        state.notifications = INITIAL_NOTIFICATIONS_STATE.notifications;
    },
    /**
     * Add a notification to state.
     */
    addNotification: (state: NotificationsState, { payload }: PayloadAction<INotificationOptions>) => {
        state.notifications.push(createNotification(payload));
    },
    /**
     * Remove a notification from state.
     */
    removeNotification: (state: NotificationsState, { payload: { id } }: PayloadAction<{ id: any }>) => {
        state.notifications = state.notifications.filter(x => x.id != id);
    },
    /**
     * This exists so we can animate notifications out before removing them from state.
     */
    dismissNotification: (state: NotificationsState, { payload: { id } }: PayloadAction<{ id: any }>) => {
        state.notifications = updateArray({
            array: state.notifications,
            finder: (x) => x.id == id,
            changer: (_) => ({ dismissed: true }),
        });
        return state;
    },
};

export const extraReducers = (builder: ActionReducerMapBuilder<NotificationsState>) => {
    builder
        .addCase(CoreActions.resetState, () => INITIAL_NOTIFICATIONS_STATE)
        .addCase(CoreActions.fetchUsageStats.fulfilled, (state) => notifySuccess(state, "Credentials Confirmed"))
        .addCase(CoreActions.fetchUsageStats.rejected, (state, { payload }) => notifyError(state, payload, "Unable to Confirm Credentials"))
        .addCase(ImagesActions.fetchOnePage.rejected, (state, { payload }) => notifyError(state, payload, "Unable to Sync Images"))
        .addCase(VariantsActions.fetchAll.rejected, (state, { payload }) => notifyError(state, payload, "Unable to Sync Variants"))
};
