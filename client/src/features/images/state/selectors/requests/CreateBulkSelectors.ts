import { RootState } from "@app/state"
import { CoreSelectors } from "@feature/core"
import { selectSlice } from ".."
import { BulkUploadSelectors } from "../BulkUploadSelectors"

const _request = (rootState: RootState) => selectSlice(rootState)?.requests?.createBulk
const _status = (rootState: RootState) => _request(rootState)?.status

const selectShouldSubmit = (rootState: RootState, inThunk = false): boolean => {
    if (!BulkUploadSelectors.inProgress(rootState)) {
        return false
    }
    if (!CoreSelectors.haveCredentials(rootState)) {
        return false
    }
    if (!inThunk) {
        if (!["idle", "fulfilled"].includes(_status(rootState))) {
            return false
        }
    }
    return true
}

const selectSubmitting = (rootState: RootState): boolean => {
    return _status(rootState) === "pending"
}

export const CreateBulkSelectors = {
    submitting: selectSubmitting,
    shouldSubmit: selectShouldSubmit,
}
