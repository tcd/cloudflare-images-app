import { CoreSlice } from "./state"
import {
    fetchUsageStats,
} from "./thunks"

export const Actions = {
    ...CoreSlice.actions,
    fetchUsageStats,
}
