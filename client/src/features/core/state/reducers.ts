import { DateTime } from "luxon"
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"

import { CloudflareConfig, parseError, ThemeMode, LocationChangePayload } from "@app/lib"
import { CoreState, INITIAL_CORE_STATE } from "./state"
import {
    fetchUsageStats,
} from "./thunks"

export const reducers = {
    resetState: () => INITIAL_CORE_STATE,
    locationChange: (state: CoreState, _action: PayloadAction<LocationChangePayload>) => {
        return state
    },
    setAppTitle: (state: CoreState, { payload: { title } }: PayloadAction<{ title: string }>) => {
        state.appTitle = title
    },
    clearAppTitle: (state: CoreState) => {
        state.appTitle = INITIAL_CORE_STATE.appTitle
    },
    toggleThemeMode: (state: CoreState) => {
        state.themeMode = state.themeMode === "dark" ? "light" : "dark"
    },
    setThemeMode: (state: CoreState, { payload: { mode } }: PayloadAction<{ mode: ThemeMode }>) => {
        state.themeMode = mode
    },
    resetThemeMode: (state: CoreState) => {
        state.themeMode = INITIAL_CORE_STATE.themeMode
    },
    openDrawer: (state: CoreState) => {
        state.drawerOpen = true
    },
    closeDrawer: (state: CoreState) => {
        state.drawerOpen = false
    },
    toggleDrawer: (state: CoreState) => {
        state.drawerOpen = !state.drawerOpen
    },
    setConfig: (state: CoreState, { payload }: PayloadAction<CloudflareConfig>) => {
        state.config = payload
    },
}

export const extraReducers = (builder: ActionReducerMapBuilder<CoreState>) => {
    builder
        // ---------------------------------------------------------------------
        // Fetch Stats
        // ---------------------------------------------------------------------
        .addCase(fetchUsageStats.pending, (state) => {
            state.requests.fetchUsageStats.status = "pending"
        })
        .addCase(fetchUsageStats.rejected, (state, { payload }) => {
            state.requests.fetchUsageStats.status = "rejected"
            state.requests.fetchUsageStats.error = parseError(payload)
        })
        .addCase(fetchUsageStats.fulfilled, (state, { payload }) => {
            state.requests.fetchUsageStats.status = "fulfilled"
            state.requests.fetchUsageStats.response = payload
            state.requests.fetchUsageStats.updatedAt = DateTime.now().toISO()
        })
}
