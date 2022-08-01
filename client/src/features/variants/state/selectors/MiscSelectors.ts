import { isBlank } from "@app/lib"
import { RootState } from "@app/state"
import { EntitySelectors } from "./EntitySelectors"
import { selectSlice } from "."

const selectActiveId = (rootState: RootState): string => selectSlice(rootState)?.activeId
const selectSearchFilter = (rootState: RootState): string => selectSlice(rootState)?.searchFilter?.toLocaleLowerCase()

const selectAll = (rootState: RootState) => {
    return EntitySelectors.selectAll(rootState) ?? []
}

const selectFiltered = (rootState: RootState) => {
    const all = selectAll(rootState)
    const filter = selectSearchFilter(rootState)
    if (isBlank(filter)) {
        return all
    }
    const filtered = all.filter(x => x.id?.toLocaleLowerCase().includes(filter))
    return filtered
}

const selectActiveEntity = (rootState: RootState) => {
    const id = selectActiveId(rootState)
    if (isBlank(id)) {
        return null
    }
    const all = selectAll(rootState)
    return all.find(x => x.id === id)
}

// =============================================================================

export const MiscSelectors = {
    all: selectAll,
    active: {
        id: selectActiveId,
        entity: selectActiveEntity,
    },
    filtered: selectFiltered,
    searchFilter: selectSearchFilter,
}
