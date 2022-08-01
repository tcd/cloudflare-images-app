import { RootState } from "@app/state"
import { ImagesState } from "../state"

export const selectSlice = (rootState: RootState): ImagesState => rootState?.Images
