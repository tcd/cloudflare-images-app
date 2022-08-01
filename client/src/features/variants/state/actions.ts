import { VariantsSlice } from "./state"
import {
    fetchAll,
} from "./thunks"

export const Actions = {
    ...VariantsSlice.actions,
    fetchAll,
}
