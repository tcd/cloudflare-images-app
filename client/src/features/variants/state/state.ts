import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

import type Cloudflare from "cloudflare-images"
import { FeatureKeys, RequestState } from "@app/lib"
import { reducers, extraReducers } from "./reducers"

// =============================================================================

// https://redux-toolkit.js.org/api/createEntityAdapter
export const VariantsEntityAdapter = createEntityAdapter<Cloudflare.Variants.Variant>({
    selectId: (entity) => { return entity?.id },
    sortComparer: (a, b) => { return a?.id?.toLowerCase().localeCompare(b?.id.toLowerCase()) },
})

// =============================================================================

export interface VariantsState {
    ids: string[]
    entities: Record<string, Cloudflare.Variants.Variant>
    activeId: string
    searchFilter: string
    requests: {
        fetchAll: RequestState<Cloudflare.Responses.ListVariants>
        fetchOne: RequestState<Cloudflare.Responses.GetVariant>
        create: RequestState<Cloudflare.Responses.CreateVariant>
        update: RequestState<Cloudflare.Responses.UpdateVariant>
        delete: RequestState<Cloudflare.Responses.DeleteVariant>
    }
}

// =============================================================================

export const INITIAL_VARIANTS_STATE: VariantsState = {
    ids: [],
    entities: {},
    activeId: null,
    searchFilter: "",
    requests: {
        fetchAll: { status: "idle", updatedAt: DateTime.now().toISO() },
        fetchOne: { status: "idle", updatedAt: DateTime.now().toISO() },
        create:   { status: "idle", updatedAt: DateTime.now().toISO() },
        update:   { status: "idle", updatedAt: DateTime.now().toISO() },
        delete:   { status: "idle", updatedAt: DateTime.now().toISO() },
    },
}

// =============================================================================

export const VariantsSlice = createSlice({
    name: FeatureKeys.Variants,
    initialState: VariantsEntityAdapter.getInitialState({
        ...INITIAL_VARIANTS_STATE,
    }),
    reducers,
    extraReducers,
})
