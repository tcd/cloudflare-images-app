import { RootState } from "@app/state"
import { CoreSelectors } from "@feature/core"
import { selectSlice } from ".."
import { UpdateSelectors } from "../UpdateSelectors"

const _request = (rootState: RootState) => selectSlice(rootState)?.requests?.fetchOnePage
const _status = (rootState: RootState) => _request(rootState)?.status

const selectShouldFetch = (rootState: RootState, inThunk = false): boolean => {
    if (_status(rootState) === "rejected") {
        return false
    }
    if (!UpdateSelectors.inProgress(rootState)) {
        return false
    }
    if (!CoreSelectors.haveCredentials(rootState)) {
        return false
    }
    // const imageCount = CoreSelectors.apiImageCount(rootState)
    // if (!(imageCount > 0)) {
    if (!(CoreSelectors.apiPageCount(rootState) > 0)) {
        return false
    }
    // const currentPage = MiscSelectors.update.currentPage(rootState)
    if (!inThunk) {
        if (!["idle", "fulfilled"].includes(_status(rootState))) {
            return false
        }
    }
    return true
}

/** used to disable *refresh images* button */
const canFetch = (rootState: RootState): boolean => {
    if (!CoreSelectors.haveCredentials(rootState)) {
        return false
    }
    if (!(CoreSelectors.apiPageCount(rootState) > 0)) {
        return false
    }
    if (_status(rootState) === "rejected") {
        return false
    }
    if (_status(rootState) === "pending") {
        return false
    }
    return true
}

const selectFetching = (rootState: RootState): boolean => {
    return _status(rootState) === "pending"
}

export const FetchOnePageSelectors = {
    fetching: selectFetching,
    shouldFetch: selectShouldFetch,
    canRefresh: canFetch,
}
