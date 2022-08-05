import { ImagesSlice } from "./state"
import {
    fetchOne,
    fetchOnePage,
    submitCreate,
    submitDelete,
} from "./thunks"

export const Actions = {
    ...ImagesSlice.actions,
    fetchOne,
    fetchOnePage,
    submitCreate,
    submitDelete,
}
