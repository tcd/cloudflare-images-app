import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

import type { Responses } from "cloudflare-images"
import { FeatureKeys, RequestState, ImageWithoutVariants } from "@app/lib"
import { reducers, extraReducers } from "./reducers"

// =============================================================================

export const ImagesEntityAdapter = createEntityAdapter<ImageWithoutVariants>({
    selectId: (entity) => { return entity?.id },
    sortComparer: (a, b) => { return a?.id?.toLowerCase().localeCompare(b?.id.toLowerCase()) },
})

// =============================================================================

export interface ImagesState {
    ids: string[]
    entities: Record<string, ImageWithoutVariants>
    activeId: string
    searchFilter: string
    requests: {
        fetchAll: RequestState<any>
        fetchOne: RequestState<Responses.GetImage>
        fetchOnePage: RequestState<Responses.ListImages>
        create: RequestState<Responses.CreateImage>
        update: RequestState<Responses.UpdateImage>
        delete: RequestState<Responses.DeleteImage>
        createBulk: RequestState<Responses.CreateImage>
    }
    update: {
        inProgress: boolean
        currentPage: Integer
        lastCompleted: Timestamp
    }
    bulkUpload: {
        inProgress: boolean
        totalImages: Integer
        currentIndex: Integer
        errors: any[]
        uploaded: ImageWithoutVariants[]
    }
}

// =============================================================================

export const INITIAL_IMAGES_STATE: ImagesState = {
    ids: [],
    entities: {},
    activeId: null,
    searchFilter: "",
    requests: {
        fetchAll:     { status: "idle", updatedAt: DateTime.now().toISO() },
        fetchOne:     { status: "idle", updatedAt: DateTime.now().toISO() },
        fetchOnePage: { status: "idle", updatedAt: DateTime.now().toISO() },
        create:       { status: "idle", updatedAt: DateTime.now().toISO() },
        update:       { status: "idle", updatedAt: DateTime.now().toISO() },
        delete:       { status: "idle", updatedAt: DateTime.now().toISO() },
        createBulk:   { status: "idle", updatedAt: DateTime.now().toISO() },
    },
    update: {
        inProgress: false,
        currentPage: 1,
        lastCompleted: null,
    },
    bulkUpload: {
        inProgress: false,
        totalImages: 0,
        currentIndex: 0,
        errors: [],
        uploaded: [],
    },
}

// =============================================================================

export const ImagesSlice = createSlice({
    name: FeatureKeys.Images,
    initialState: ImagesEntityAdapter.getInitialState({
        ...INITIAL_IMAGES_STATE,
    }),
    reducers,
    extraReducers,
})
