import type { Location } from "react-router-dom"
import { createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

import type Cloudflare from "cloudflare-images"
import { FeatureKeys, ThemeMode, CloudflareConfig, RequestState } from "@app/lib"
import { reducers, extraReducers } from "./reducers"

// =============================================================================

export interface CoreState {
    appTitle: string
    drawerOpen: boolean
    themeMode: ThemeMode
    config: CloudflareConfig
    requests: {
        fetchUsageStats: RequestState<Cloudflare.Responses.UsageStatistics>
    }
    previousLocation: Location
}

// =============================================================================

export const INITIAL_CORE_STATE: CoreState = {
    appTitle: "Cloudflare Images UI",
    drawerOpen: false,
    // themeMode: "system",
    themeMode: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    config: {
        accountId: "",
        apiKey: "",
        accountHash: "",
    },
    requests: {
        fetchUsageStats: { status: "idle", updatedAt: DateTime.now().toISO() },
    },
    previousLocation: null,
}

// =============================================================================

export const CoreSlice = createSlice({
    name: FeatureKeys.Core,
    initialState: INITIAL_CORE_STATE,
    reducers,
    extraReducers,
})
