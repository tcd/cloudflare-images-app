import { ImagesSlice } from "./state"
import {
    fetchOnePage,
    submitCreate,
    submitDelete,
} from "./thunks"

export const Actions = {
    ...ImagesSlice.actions,
    fetchOnePage,
    submitCreate,
    submitDelete,
}
