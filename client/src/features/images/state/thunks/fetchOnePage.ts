import { createAsyncThunk } from "@reduxjs/toolkit"

import Cloudflare from "cloudflare-images"
import { RootState, Selectors } from "@app/state"
import { FeatureKeys, ServerClient } from "@app/lib"

const actionType = `${FeatureKeys.Images}/fetchOnePage`

export interface FetchOnePageResult {
    response: Cloudflare.Responses.ListImages
    lastRequest: boolean
}

export const fetchOnePage = createAsyncThunk<FetchOnePageResult, void, { rejectValue: string | any }>(actionType, async (_, thunkApi) => {
    const rootState = thunkApi.getState() as RootState

    const shouldFetch = Selectors.Images.requests.fetchOnePage.shouldFetch(rootState, true)
    if (!shouldFetch) {
        return thunkApi.rejectWithValue("Something went wrong")
    }

    const credentials = Selectors.Core.credentials(rootState)
    const currentPage = Selectors.Images.update.currentPage(rootState)
    const totalPages  = Selectors.Core.apiPageCount(rootState)
    const lastRequest = (currentPage == totalPages)

    try {
        const client = new ServerClient(credentials)
        const response = await client.listImages({ page: currentPage, per_page: 100 })
        if (response?.success) {
            return {
                response,
                lastRequest,
            }
        } else {
            return thunkApi.rejectWithValue(response)
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
