import { isBlank } from "@app/lib"
import { RootState } from "@app/state"
import { selectSlice } from "../select-slice"
import { MiscSelectors } from "../MiscSelectors"

const _selectRequest = (rootState: RootState) => selectSlice(rootState)?.requests?.fetchOne
const _selectRequestStatus = (rootState: RootState) => _selectRequest(rootState)?.status

const selectShouldFetch = (rootState: RootState): boolean => {
    if (isBlank(MiscSelectors.active.id)) {
        return false
    }
    if (!isBlank(MiscSelectors.active.entity)) {
        return false
    }
    if (_selectRequestStatus(rootState) === "idle") {
        return true
    }
    return false
}

const selectFetching = (rootState: RootState): boolean => {
    return _selectRequestStatus(rootState) === "pending"
}

export const FetchOneSelectors = {
    fetching: selectFetching,
    shouldFetch: selectShouldFetch,
}
