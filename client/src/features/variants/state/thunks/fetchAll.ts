import { createAsyncThunk } from "@reduxjs/toolkit"

import { Responses } from "cloudflare-images"
import { RootState, Selectors } from "@app/state"
import { FeatureKeys, ServerClient } from "@app/lib"

const actionType = `${FeatureKeys.Variants}/fetchAll`

export const fetchAll = createAsyncThunk<Responses.ListVariants, void>(actionType, async (_, thunkApi) => {
    const rootState = thunkApi.getState() as RootState
    const credentials = Selectors.Core.credentials(rootState)

    const canSubmit = Selectors.Core.haveCredentials(rootState)
    if (!canSubmit) {
        return thunkApi.rejectWithValue("Please configure credentials")
    }

    try {
        const client = new ServerClient(credentials)
        const response = await client.listVariants()
        if (response?.success) {
            return response
        } else {
            return thunkApi.rejectWithValue(response)
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

