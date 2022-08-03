import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

import type { Responses} from "cloudflare-images"
import { FeatureKeys, RequestState, ImageWithoutVariants } from "@app/lib"
import { reducers, extraReducers } from "./reducers"

// =============================================================================

// https://redux-toolkit.js.org/api/createEntityAdapter
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
        fetchOne: RequestState<any>
        fetchOnePage: RequestState<Responses.ListImages>
        create: RequestState<Responses.CreateImage>
        delete: RequestState<Responses.DeleteImage>
    }
    update: {
        inProgress: boolean
        currentPage: Integer
        lastCompleted: Timestamp
    }
}

// =============================================================================

export const INITIAL_IMAGES_STATE: ImagesState = {
    // ids: images.map(x => x.id),
    // @ts-ignore: next-line
    // entities: images.reduce((result, image) => { result[image.id] = image; return result }, {}),
    ids: [],
    entities: {},
    activeId: null,
    searchFilter: "",
    requests: {
        fetchAll:     { status: "idle", updatedAt: DateTime.now().toISO() },
        fetchOne:     { status: "idle", updatedAt: DateTime.now().toISO() },
        fetchOnePage: { status: "idle", updatedAt: DateTime.now().toISO() },
        create:       { status: "idle", updatedAt: DateTime.now().toISO() },
        delete:       { status: "idle", updatedAt: DateTime.now().toISO() },
    },
    update: {
        inProgress: false,
        currentPage: 1,
        lastCompleted: null,
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
