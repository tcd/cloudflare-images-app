import { isBlank } from "@app/lib"
import { RootState } from "@app/state"
import { CoreSelectors } from "@feature/core"
import { selectSlice } from ".."

const _selectRequest = (rootState: RootState) => selectSlice(rootState)?.requests?.fetchAll
const _selectRequestStatus = (rootState: RootState) => _selectRequest(rootState)?.status

const selectShouldFetch = (rootState: RootState): boolean => {
    if (_selectRequestStatus(rootState) === "idle") {
        return true
    }
    return false
}

const selectCanFetch = (rootState: RootState): boolean => {
    return !isBlank(CoreSelectors.apiImageCount(rootState))
}

const selectFetching = (rootState: RootState): boolean => {
    return _selectRequestStatus(rootState) === "pending"
}

export const FetchAllSelectors = {
    fetching: selectFetching,
    canFetch: selectCanFetch,
    shouldFetch: selectShouldFetch,
}
