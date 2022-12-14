import omit from "lodash/omit"
import { DateTime } from "luxon"
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"

import { ImagesEntityAdapter, ImagesState, INITIAL_IMAGES_STATE } from "./state"
import {
    fetchOnePage,
} from "./thunks"
import { parseError } from "@app/lib"
import { CoreActions } from "@feature/core"

export const reducers = {
    resetState: () => INITIAL_IMAGES_STATE,
    beginUpdate: (state: ImagesState) => {
        if (state.update.inProgress === true) {
            return state
        }
        state.update.inProgress = true
        state.update.currentPage = 1
        state.requests.fetchOnePage = { ...INITIAL_IMAGES_STATE.requests.fetchOnePage }
    },
    setSearchFilter: (state: ImagesState, { payload: { filter } }: PayloadAction<{ filter: string }>) => {
        state.searchFilter = filter
    },
    clearSearchFilter: (state: ImagesState) => {
        state.searchFilter = INITIAL_IMAGES_STATE.searchFilter
    },
}

export const extraReducers = (builder: ActionReducerMapBuilder<ImagesState>) => {
    builder
        // ---------------------------------------------------------------------
        // External
        // ---------------------------------------------------------------------
        .addCase(CoreActions.resetState, () => INITIAL_IMAGES_STATE)
        .addCase(CoreActions.locationChange, (state, { payload }) => {
            if (payload?.pathParams?.imageId) {
                state.activeId = payload.pathParams.imageId
            } else {
                state.activeId = null
            }
            return state
        })
        // ---------------------------------------------------------------------
        // Fetch Paginated Images
        // ---------------------------------------------------------------------
        .addCase(fetchOnePage.pending, (state) => {
            state.requests.fetchOnePage.status = "pending"
        })
        .addCase(fetchOnePage.rejected, (state, { payload }) => {
            state.requests.fetchOnePage.status = "rejected"
            state.requests.fetchOnePage.error = parseError(payload)
            state.update.currentPage++
            state.update.inProgress = false
        })
        .addCase(fetchOnePage.fulfilled, (state, { payload: { response, lastRequest } }) => {
            state.requests.fetchOnePage.status = "fulfilled"
            state.requests.fetchOnePage.response = response
            state.update.currentPage++
            const slimData = response?.result?.images.map(x => omit(x, ["variants"]))
            ImagesEntityAdapter.upsertMany(state, slimData)
            if (lastRequest === true) {
                state.update.inProgress = false
                state.update.lastCompleted = DateTime.now().toISO()
            }
        })
}
