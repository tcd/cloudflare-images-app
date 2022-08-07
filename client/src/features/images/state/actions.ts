import { ImagesSlice } from "./state"
import {
    fetchOne,
    fetchOnePage,
    submitCreate,
    submitDelete,
    submitFileForBulk,
} from "./thunks"

export const Actions = {
    ...ImagesSlice.actions,
    fetchOne,
    fetchOnePage,
    submitCreate,
    submitDelete,
    submitFileForBulk,
}
