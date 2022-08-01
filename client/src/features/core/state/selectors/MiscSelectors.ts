import Cloudflare, { Responses } from "cloudflare-images"
import { ThemeMode, CloudflareConfig, isBlank } from "@app/lib"
import { RootState } from "@app/state"
import { selectSlice } from "."

const selectAppTitle = (rootState: RootState): string => selectSlice(rootState)?.appTitle
const selectDrawerOpen = (rootState: RootState): boolean => selectSlice(rootState)?.drawerOpen
const selectThemeMode = (rootState: RootState): ThemeMode => selectSlice(rootState)?.themeMode
const selectDarkModeEnabled = (rootState: RootState): boolean => selectThemeMode(rootState) === "dark"

// =============================================================================

const selectConfig = (rootState: RootState): CloudflareConfig => selectSlice(rootState)?.config
const selectAccountHash = (rootState: RootState): string => selectConfig(rootState)?.accountHash
const selectCredentials = (rootState: RootState): Cloudflare.Credentials => {
    const config = selectConfig(rootState)
    return {
        accountId: config?.accountId,
        apiKey: config?.apiKey,
    }
}

const selectHaveCredentials = (rootState: RootState): boolean => {
    const credentials = selectCredentials(rootState)
    if (isBlank(credentials?.accountId)) { return false }
    if (isBlank(credentials?.apiKey)) { return false }
    return true
}

const selectApiImageCount = (rootState: RootState): Integer => {
    return selectSlice(rootState)?.requests?.fetchUsageStats?.response?.result?.count?.current ?? 0
}

const selectApiImagePageCount = (rootState: RootState): Integer => {
    return Math.ceil(selectApiImageCount(rootState) / 100) ?? 0
}

// =============================================================================

export const MiscSelectors = {
    appTitle: selectAppTitle,
    drawerOpen: selectDrawerOpen,
    themeMode: selectThemeMode,
    darkModeEnabled: selectDarkModeEnabled,
    config: selectConfig,
    credentials: selectCredentials,
    accountHash: selectAccountHash,
    haveCredentials: selectHaveCredentials,
    apiImageCount: selectApiImageCount,
    apiPageCount: selectApiImagePageCount,
}
