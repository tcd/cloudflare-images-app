import { RootState } from "@app/state"
import { selectSlice } from "../select-slice"

const selectRequestState = (rootState: RootState) => selectSlice(rootState)?.requests?.fetchUsageStats

const selectStatus = (rootState: RootState) => selectRequestState(rootState)?.status

const selectFetching = (rootState: RootState): boolean => {
    return selectStatus(rootState) === "pending"
}

export const FetchUsageStatsSelectors = {
    fetching: selectFetching,
}
