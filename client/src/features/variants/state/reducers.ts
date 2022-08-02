import { DateTime } from "luxon"
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"

import { parseError } from "@app/lib"
import { CoreActions } from "@feature/core"
import { VariantsEntityAdapter, VariantsState, INITIAL_VARIANTS_STATE } from "./state"
import {
    fetchAll,
    submitCreate,
    submitDelete,
} from "./thunks"

export const reducers = {
    resetState: () => INITIAL_VARIANTS_STATE,
    setSearchFilter: (state: VariantsState, { payload: { filter } }: PayloadAction<{ filter: string }>) => {
        state.searchFilter = filter
    },
    clearSearchFilter: (state: VariantsState) => {
        state.searchFilter = INITIAL_VARIANTS_STATE.searchFilter
    },
}

export const extraReducers = (builder: ActionReducerMapBuilder<VariantsState>) => {
    builder
        // ---------------------------------------------------------------------
        // External
        // ---------------------------------------------------------------------
        .addCase(CoreActions.resetState, () => INITIAL_VARIANTS_STATE)
        .addCase(CoreActions.locationChange, (state, { payload }) => {
            if (payload?.pathParams?.variantId) {
                state.activeId = payload.pathParams.variantId
            } else {
                state.activeId = null
            }
            return state
        })
        // ---------------------------------------------------------------------
        // Fetch All
        // ---------------------------------------------------------------------
        .addCase(fetchAll.pending, (state) => {
            state.requests.fetchAll.status = "pending"
        })
        .addCase(fetchAll.rejected, (state, { payload }) => {
            state.requests.fetchAll.status = "rejected"
            state.requests.fetchAll.error = parseError(payload)
        })
        .addCase(fetchAll.fulfilled, (state, { payload }) => {
            state.requests.fetchAll.status = "fulfilled"
            state.requests.fetchAll.response = payload
            state.requests.fetchAll.updatedAt = DateTime.now().toISO()
            VariantsEntityAdapter.upsertMany(state, payload.result.variants)
        })
        // ---------------------------------------------------------------------
        // Create
        // ---------------------------------------------------------------------
        .addCase(submitCreate.pending, (state) => {
            state.requests.create.status = "pending"
        })
        .addCase(submitCreate.rejected, (state, { payload }) => {
            state.requests.create.status = "rejected"
            state.requests.create.error = parseError(payload)
        })
        .addCase(submitCreate.fulfilled, (state, { payload }) => {
            state.requests.create.status = "fulfilled"
            state.requests.create.response = payload
            state.requests.create.updatedAt = DateTime.now().toISO()
            VariantsEntityAdapter.upsertOne(state, payload.result.variant)
        })
        // ---------------------------------------------------------------------
        // Delete
        // ---------------------------------------------------------------------
        .addCase(submitDelete.pending, (state, action) => {
            state.requests.delete.status = "pending"
            state.activeId = action.meta.arg
        })
        .addCase(submitDelete.rejected, (state, { payload }) => {
            state.requests.delete.status = "rejected"
            state.requests.delete.error = parseError(payload)
        })
        .addCase(submitDelete.fulfilled, (state, { payload }) => {
            state.requests.delete.status = "fulfilled"
            state.requests.delete.response = payload
            state.requests.delete.updatedAt = DateTime.now().toISO()
            VariantsEntityAdapter.removeOne(state, state.activeId)
            state.activeId = null
        })
}
