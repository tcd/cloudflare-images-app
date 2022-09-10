import omit from "lodash/omit"
import { DateTime } from "luxon"
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"

import { ImagesEntityAdapter, ImagesState, INITIAL_IMAGES_STATE } from "./state"
import {
    fetchOne,
    fetchOnePage,
    submitCreate,
    submitDelete,
    submitFileForBulk,
    submitUpdate,
} from "./thunks"
import { parseError } from "@app/lib"
import { CoreActions } from "@feature/core"

export const reducers = {
    resetState: () => INITIAL_IMAGES_STATE,
    setSearchFilter: (state: ImagesState, { payload: { filter } }: PayloadAction<{ filter: string }>) => {
        state.searchFilter = filter
    },
    clearSearchFilter: (state: ImagesState) => {
        state.searchFilter = INITIAL_IMAGES_STATE.searchFilter
    },
    beginUpdate: (state: ImagesState) => {
        if (state.update.inProgress === true) {
            return state
        }
        state.ids = []
        state.entities = {}
        state.update.inProgress = true
        state.update.currentPage = 1
        state.requests.fetchOnePage = { ...INITIAL_IMAGES_STATE.requests.fetchOnePage }
    },
    beginBulkUpload: (state: ImagesState, { payload: { totalImages } }: PayloadAction<{ totalImages: Integer }>) => {
        if (state.bulkUpload.inProgress === true) {
            return state
        }
        state.requests.createBulk = { ...INITIAL_IMAGES_STATE.requests.createBulk }
        state.bulkUpload = {
            inProgress: true,
            currentIndex: 0,
            totalImages: totalImages,
            errors: [],
            uploaded: [],
        }
    },
    cancelBulkUpload: (state: ImagesState, { payload }: PayloadAction<{ message: string, details?: Record<string, any> }>) => {
        state.bulkUpload.inProgress = false
        // state.bulkUpload.currentIndex = (state.bulkUpload.totalImages + 10)
        state.bulkUpload.errors.push(payload)
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
        // ---------------------------------------------------------------------
        // Fetch One
        // ---------------------------------------------------------------------
        .addCase(fetchOne.pending, (state) => {
            state.requests.fetchOne.status = "pending"
        })
        .addCase(fetchOne.rejected, (state, { payload }) => {
            state.requests.fetchOne.status = "rejected"
            state.requests.fetchOne.error = parseError(payload)
        })
        .addCase(fetchOne.fulfilled, (state, { payload }) => {
            state.requests.fetchOne.status = "fulfilled"
            state.requests.fetchOne.response = payload
            state.requests.fetchOne.updatedAt = DateTime.now().toISO()
            ImagesEntityAdapter.upsertOne(state, payload.result)
        })
        // ---------------------------------------------------------------------
        // Upload Image
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
            ImagesEntityAdapter.upsertOne(state, payload.result)
        })
        // ---------------------------------------------------------------------
        // Delete Image
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
            ImagesEntityAdapter.removeOne(state, state.activeId)
            state.activeId = null
        })
        // ---------------------------------------------------------------------
        // Upload One File in Bulk Upload
        // ---------------------------------------------------------------------
        .addCase(submitFileForBulk.pending, (state) => {
            state.requests.createBulk.status = "pending"
        })
        .addCase(submitFileForBulk.rejected, (state, { payload }) => {
            state.requests.createBulk.status = "rejected"
            state.requests.createBulk.error = parseError(payload)
            state.bulkUpload.errors.push(parseError(payload))
            state.bulkUpload.currentIndex++
            state.bulkUpload.inProgress = false
        })
        .addCase(submitFileForBulk.fulfilled, (state, { payload }) => {
            state.requests.createBulk.status = "fulfilled"
            state.requests.createBulk.response = payload
            state.requests.createBulk.updatedAt = DateTime.now().toISO()
            state.bulkUpload.currentIndex++
            const slimData = omit(payload?.result, ["variants"])
            state.bulkUpload.uploaded.push(slimData)
            ImagesEntityAdapter.upsertOne(state, slimData)
            if ((state.bulkUpload.currentIndex + 1) > (state.bulkUpload.totalImages)) {
                state.bulkUpload.inProgress = false
            }
        })
        // ---------------------------------------------------------------------
        // Update
        // ---------------------------------------------------------------------
        .addCase(submitUpdate.pending, (state) => {
            state.requests.update.status = "pending"
        })
        .addCase(submitUpdate.rejected, (state, { payload }) => {
            state.requests.update.status = "rejected"
            state.requests.update.error = parseError(payload)
        })
        .addCase(submitUpdate.fulfilled, (state, { payload }) => {
            state.requests.update.status = "fulfilled"
            state.requests.update.response = payload
            state.requests.update.updatedAt = DateTime.now().toISO()
            ImagesEntityAdapter.upsertOne(state, payload.result)
        })
}
