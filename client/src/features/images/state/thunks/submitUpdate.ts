import { createAsyncThunk } from "@reduxjs/toolkit"

import type { Requests, Responses } from "cloudflare-images"
import type { RootState } from "@app/state"
import { Selectors } from "@app/state"
import { FeatureKeys, isBlank, ServerClient } from "@app/lib"

const actionType = `${FeatureKeys.Images}/submitUpdate`

export const submitUpdate = createAsyncThunk<Responses.UpdateImage, Requests.UpdateImage>(actionType, async (options, thunkApi) => {
    try {
        const rootState = thunkApi.getState() as RootState

        const haveCreds = Selectors.Core.haveCredentials(rootState)
        if (!haveCreds) {
            return thunkApi.rejectWithValue("Please configure credentials")
        }
        const activeId = Selectors.Images.active.id(rootState)
        if (isBlank(activeId)) {
            return thunkApi.rejectWithValue("No active id")
        }

        const credentials = Selectors.Core.credentials(rootState)
        const client = new ServerClient(credentials)
        const response = await client.updateImage(activeId, options)
        if (response?.success) {
            return response
        } else {
            return thunkApi.rejectWithValue(response)
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

