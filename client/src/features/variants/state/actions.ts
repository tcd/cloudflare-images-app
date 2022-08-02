import { VariantsSlice } from "./state"
import {
    fetchAll,
    submitCreate,
    submitDelete,
} from "./thunks"

export const Actions = {
    ...VariantsSlice.actions,
    fetchAll,
    submitCreate,
    submitDelete,
}
