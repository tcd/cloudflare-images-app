import { RootState } from "@app/state"
import { CoreState } from "../state"

export const selectSlice = (rootState: RootState): CoreState => {
    return rootState?.Core
}
