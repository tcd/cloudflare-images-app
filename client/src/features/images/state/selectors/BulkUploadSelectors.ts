import type { RootState } from "@app/state"
import { selectSlice } from "."

const _selectBulkUpload = (rootState: RootState) => selectSlice(rootState)?.bulkUpload

const selectInProgress = (rootState: RootState): boolean => {
    return _selectBulkUpload(rootState)?.inProgress === true
}

const selectUploaded = (rootState: RootState) => {
    return _selectBulkUpload(rootState)?.uploaded ?? []
}

const selectUploadedNames = (rootState: RootState) => {
    return selectUploaded(rootState).map(x => x.filename)
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

const selectProgress = (rootState: RootState): number => {
    const currentIndex = selectCurrentIndex(rootState)
    const totalImages = selectTotalToUpload(rootState)
    const progress = (currentIndex / totalImages) * 100
    return progress
}

// =============================================================================

export const BulkUploadSelectors = {
    inProgress:   selectInProgress,
    currentIndex: selectCurrentIndex,
    complete:     selectComplete,
    progress:     selectProgress,
    // uploaded:     selectUploaded,
    uploadedNames:     selectUploadedNames,
}
