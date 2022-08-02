import { RootState } from "@app/state"
import { selectSlice } from ".."

const _selectRequest = (rootState: RootState) => selectSlice(rootState)?.requests?.delete
const _selectRequestStatus = (rootState: RootState) => _selectRequest(rootState)?.status

const selectSubmitting = (rootState: RootState): boolean => {
    return _selectRequestStatus(rootState) === "pending"
}

export const DeleteSelectors = {
    submitting: selectSubmitting,
}
