import { ImagesSlice } from "./state"
import {
    fetchOne,
    fetchOnePage,
    submitCreate,
    submitDelete,
    submitFileForBulk,
    submitUpdate,
} from "./thunks"

export const Actions = {
    ...ImagesSlice.actions,
    fetchOne,
    fetchOnePage,
    submitCreate,
    submitDelete,
    submitFileForBulk,
    submitUpdate,
}
