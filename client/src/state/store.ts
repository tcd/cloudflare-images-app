import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { getPersistConfig } from "redux-deep-persist"

import {
    CONFIG,
    FeatureKeys,
    reduxDevToolsOptions,
} from "@app/lib"
import {
    CoreSlice,
    ImagesSlice,
    NotificationsSlice,
    VariantsSlice,
} from "../features"

const devTools = CONFIG.notProduction() ? reduxDevToolsOptions : false

const rootReducer = combineReducers({
    [FeatureKeys.Core]: CoreSlice.reducer,
    [FeatureKeys.Images]: ImagesSlice.reducer,
    [FeatureKeys.Notifications]: NotificationsSlice.reducer,
    [FeatureKeys.Variants]: VariantsSlice.reducer,
})

const persistConfig = getPersistConfig({
    rootReducer,
    key: "root",
    version: 1,
    storage: storage,
    // blacklist: [
    //     "router",
    // ],
    whitelist: [
        "Core.credentials",
        "Core.themeMode",
        "Core.drawerOpen",
        "Core.config",
        "Core.requests.fetchUsageStats",
        "Images.ids",
        "Images.entities",
        "Variants.ids",
        "Variants.entities",
    ],
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // @ts-ignore: next-line
    devTools: devTools,
    // @ts-ignore: next-line
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // immutableCheck:    { ignoredPaths: ["Builder.everythingRequest.response"] },
        // serializableCheck: { ignoredPaths: ["Builder.everythingRequest.response"] },
        // serializableCheck: { warnAfter: 500 },
        serializableCheck: {
            ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
        },
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppSelector<T = any> = (rootState: RootState) => T

export const persistor = persistStore(store)
