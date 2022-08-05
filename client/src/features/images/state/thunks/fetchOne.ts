import { createAsyncThunk } from "@reduxjs/toolkit"

import { Responses } from "cloudflare-images"
import { RootState, Selectors } from "@app/state"
import { FeatureKeys, ServerClient } from "@app/lib"

const actionType = `${FeatureKeys.Images}/fetchOne`

export const fetchOne = createAsyncThunk<Responses.GetImage, string, { rejectValue: string | any }>(actionType, async (id: string, thunkApi) => {
    try {
        const rootState = thunkApi.getState() as RootState

        const canSubmit = Selectors.Core.haveCredentials(rootState)
        if (!canSubmit) {
            return thunkApi.rejectWithValue("Please configure credentials")
        }

        const credentials = Selectors.Core.credentials(rootState)
        const client = new ServerClient(credentials)
        const response = await client.getImage(id)
        if (response?.success) {
            return response
        } else {
            return thunkApi.rejectWithValue(response)
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

