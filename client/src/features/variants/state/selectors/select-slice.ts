import { RootState } from "@app/state"
import { VariantsState } from "../state"

export const selectSlice = (rootState: RootState): VariantsState => {
    return rootState?.Variants
}
