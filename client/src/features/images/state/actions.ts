import { ImagesSlice } from "./state"
import {
    fetchOnePage,
} from "./thunks"

export const Actions = {
    ...ImagesSlice.actions,
    fetchOnePage,
}
