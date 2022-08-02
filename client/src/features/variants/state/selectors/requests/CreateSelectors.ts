import { RootState } from "@app/state"
import { selectSlice } from ".."

const _selectRequest = (rootState: RootState) => selectSlice(rootState)?.requests?.create
const _selectRequestStatus = (rootState: RootState) => _selectRequest(rootState)?.status

const selectSubmitting = (rootState: RootState): boolean => {
    return _selectRequestStatus(rootState) === "pending"
}

const selectCompleted = (rootState: RootState): boolean => {
    return _selectRequestStatus(rootState) === "fulfilled"
}

export const CreateSelectors = {
    submitting: selectSubmitting,
    completed: selectCompleted,
}
