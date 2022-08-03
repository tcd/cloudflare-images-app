import { createAsyncThunk } from "@reduxjs/toolkit"

import { Requests, Responses } from "cloudflare-images"
import { RootState, Selectors } from "@app/state"
import { FeatureKeys, ServerClient } from "@app/lib"

const actionType = `${FeatureKeys.Variants}/submitCreate`

export const submitCreate = createAsyncThunk<Responses.CreateVariant, Requests.CreateVariant>(actionType, async (request: Requests.CreateVariant, thunkApi) => {
    try {
        const rootState = thunkApi.getState() as RootState

        const canSubmit = Selectors.Core.haveCredentials(rootState)
        if (!canSubmit) {
            return thunkApi.rejectWithValue("Please configure credentials")
        }

        const credentials = Selectors.Core.credentials(rootState)
        const client = new ServerClient(credentials)
        const response = await client.createImageVariant(request)
        if (response?.success) {
            return response
        } else {
            return thunkApi.rejectWithValue(response)
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

