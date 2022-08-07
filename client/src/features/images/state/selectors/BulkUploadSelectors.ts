import type { RootState } from "@app/state"
import { selectSlice } from "."

const _selectBulkUpload = (rootState: RootState) => selectSlice(rootState)?.bulkUpload

const selectInProgress = (rootState: RootState): boolean => {
    return _selectBulkUpload(rootState)?.inProgress === true
}

const selectCurrentIndex = (rootState: RootState): Integer => {
    return _selectBulkUpload(rootState)?.currentIndex
}

const selectTotalToUpload = (rootState: RootState): Integer => {
    return _selectBulkUpload(rootState)?.totalImages
}

const selectComplete = (rootState: RootState): boolean => {
    return selectCurrentIndex(rootState) > selectTotalToUpload(rootState)
}

// =============================================================================

export const BulkUploadSelectors = {
    inProgress:   selectInProgress,
    currentIndex: selectCurrentIndex,
    complete:     selectComplete,
}
