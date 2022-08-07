import type { RootState } from "@app/state"
import { CoreSelectors } from "@feature/core"
import { selectSlice } from "."

const _selectUpdate = (rootState: RootState) => selectSlice(rootState)?.update

const selectInProgress = (rootState: RootState): boolean => {
    return _selectUpdate(rootState)?.inProgress === true
}

const selectCurrentPage = (rootState: RootState): Integer => {
    return _selectUpdate(rootState)?.currentPage
}

const selectComplete = (rootState: RootState): boolean => {
    return selectCurrentPage(rootState) > CoreSelectors.apiPageCount(rootState)
}
// =============================================================================

export const UpdateSelectors = {
    inProgress: selectInProgress,
    currentPage: selectCurrentPage,
    complete: selectComplete,
}
