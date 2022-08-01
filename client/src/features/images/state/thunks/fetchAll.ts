import { createAsyncThunk } from "@reduxjs/toolkit"

import Cloudflare from "cloudflare-images"
import { RootState, Selectors } from "@app/state"
import { FeatureKeys, ServerClient } from "@app/lib"

const actionType = `${FeatureKeys.Images}/fetchAll`

export const fetchAll = createAsyncThunk<Cloudflare.Images.Image[], void>(actionType, async (_, thunkApi) => {
    const rootState = thunkApi.getState() as RootState
    const credentials = Selectors.Core.credentials(rootState)

    const haveCredentials = Selectors.Core.haveCredentials(rootState)
    if (!haveCredentials) {
        return thunkApi.rejectWithValue("Please configure credentials")
    }
    const pageCount = Selectors.Core.apiPageCount(rootState)
    if (!(pageCount > 0)) {
        return thunkApi.rejectWithValue("No images to fetch")
    }

    const images = []

    try {
        const client = new ServerClient(credentials)
        for (let i = 1; i <= pageCount; i++) {
            const response = await client.listImages({ page: i, per_page: 100 })
            images.push(...response.result.images)
        }
        return images
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
